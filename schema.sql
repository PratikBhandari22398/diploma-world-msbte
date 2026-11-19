-- ==============================================================================
-- DIPLOMA WORLD MSBTE - SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================
-- Run this entire script in your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Paste & Click "Run"
-- ==============================================================================

-- 1. TABLE: imp_posts (Important Exam Questions)
CREATE TABLE IF NOT EXISTS public.imp_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    semester TEXT NOT NULL,
    scheme TEXT NOT NULL DEFAULT 'K-Scheme',
    exam_date DATE,
    questions TEXT NOT NULL,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast ordering and filtering
CREATE INDEX IF NOT EXISTS idx_imp_posts_published ON public.imp_posts(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_imp_posts_filters ON public.imp_posts(scheme, semester);

-- 2. TABLE: leads (Student Entry Gate Details)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT,
    college_city TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- 3. TABLE: visitors (Real Unique Visitor Tracking)
CREATE TABLE IF NOT EXISTS public.visitors (
    visitor_id TEXT PRIMARY KEY,
    first_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_seen TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON public.visitors(last_seen DESC);

-- ==============================================================================
-- SECURE ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.imp_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Public can view published posts" ON public.imp_posts;
DROP POLICY IF EXISTS "Admin full access on imp_posts" ON public.imp_posts;
DROP POLICY IF EXISTS "Public can submit leads" ON public.leads;
DROP POLICY IF EXISTS "Admin can view leads" ON public.leads;
DROP POLICY IF EXISTS "Admin full access on leads" ON public.leads;
DROP POLICY IF EXISTS "Public can insert visitor" ON public.visitors;
DROP POLICY IF EXISTS "Public can update visitor" ON public.visitors;
DROP POLICY IF EXISTS "Admin full access on visitors" ON public.visitors;

-- A. imp_posts RLS:
-- Public (anonymous + authenticated) can read ONLY published posts
CREATE POLICY "Public can view published posts" 
ON public.imp_posts
FOR SELECT
TO anon, authenticated
USING (published = true);

-- Authenticated Admin can perform ALL actions (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "Admin full access on imp_posts" 
ON public.imp_posts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- B. leads RLS:
-- Public can INSERT into leads table (entry gate submission)
CREATE POLICY "Public can submit leads" 
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Public CANNOT read leads. ONLY authenticated admin can view leads
CREATE POLICY "Admin can view leads" 
ON public.leads
FOR SELECT
TO authenticated
USING (true);

-- Authenticated admin has full management over leads
CREATE POLICY "Admin full access on leads" 
ON public.leads
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- C. visitors RLS:
-- Public can record/update their own visitor ID
CREATE POLICY "Public can insert visitor" 
ON public.visitors
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Public can update visitor" 
ON public.visitors
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Public CANNOT read individual visitor logs. Only authenticated admin can inspect
CREATE POLICY "Admin full access on visitors" 
ON public.visitors
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ==============================================================================
-- DATABASE FUNCTIONS (RPC) FOR REAL VISITOR COUNTER
-- ==============================================================================

-- Atomically record or update a visitor and return the exact total count
CREATE OR REPLACE FUNCTION public.record_visitor(p_visitor_id TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF p_visitor_id IS NOT NULL AND length(trim(p_visitor_id)) > 0 THEN
        INSERT INTO public.visitors (visitor_id, first_seen, last_seen)
        VALUES (p_visitor_id, now(), now())
        ON CONFLICT (visitor_id)
        DO UPDATE SET last_seen = now();
    END IF;

    RETURN (SELECT count(*)::integer FROM public.visitors);
END;
$$;

-- Get real visitor count without exposing visitor rows to public
CREATE OR REPLACE FUNCTION public.get_visitor_count()
RETURNS INTEGER
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT count(*)::integer FROM public.visitors;
$$;

-- Grant execution to anon and authenticated
GRANT EXECUTE ON FUNCTION public.record_visitor(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_visitor_count() TO anon, authenticated;

-- ==============================================================================
-- SAMPLE INITIAL DATA (MSBTE K-SCHEME & I-SCHEME)
-- ==============================================================================
INSERT INTO public.imp_posts (title, subject, semester, scheme, exam_date, questions, published)
VALUES 
(
    'Top 10 IMP Questions - Operating Systems (OSY)',
    'Operating Systems (313301)',
    'Sem 3',
    'K-Scheme',
    CURRENT_DATE + INTERVAL '5 days',
    'Explain the role of Operating System as an Extended Machine and Resource Manager.
Compare Monolithic Kernel and Microkernel architecture with neat sketches.
Describe Process State Transition Diagram with suitable explanation.
Explain Preemptive vs Non-Preemptive scheduling with Gantt chart example (FCFS & Round Robin).
What is Deadlock? Explain the 4 necessary conditions for Deadlock occurrence.
Describe Banker''s Algorithm with safety algorithm steps.
Explain Paging memory management scheme and Address Translation Mechanism.
Differentiate between Internal and External Fragmentation with diagrams.
Describe Page Replacement Algorithms: FIFO, LRU, and Optimal with example strings.
Explain File Allocation Methods: Contiguous, Linked, and Indexed allocation.',
    true
),
(
    'Top 10 IMP Questions - Data Structures using C (DSU)',
    'Data Structures (313302)',
    'Sem 3',
    'K-Scheme',
    CURRENT_DATE + INTERVAL '8 days',
    'Explain Linear vs Non-Linear Data Structures with suitable real-world examples.
Write a C program / algorithm for Binary Search and state its Time Complexity.
Explain Stack operations: PUSH, POP, and PEEP with array implementation.
Convert Infix expression to Postfix using Stack: (A + B) * (C - D) / E.
Describe Queue operations: Insert and Delete in Circular Queue.
Explain Singly Linked List operations: Insert at Beginning and Delete from End.
Compare Array and Linked List data structures with memory allocation differences.
Explain Tree Terminology: Root, Depth, Height, Leaf Node, and Subtree.
Construct Binary Search Tree (BST) for given values: 45, 15, 79, 90, 10, 55, 12, 20.
Explain BFS (Breadth First Search) and DFS (Depth First Search) Graph Traversal algorithms.',
    true
),
(
    'Top 10 IMP Questions - Java Programming (JPR)',
    'Java Programming (314301)',
    'Sem 4',
    'K-Scheme',
    CURRENT_DATE + INTERVAL '12 days',
    'Explain the features of Java (Platform Independence, Bytecode, JVM, JRE, JDK).
Describe Constructor Overloading and Method Overriding with sample code.
Explain ''super'' and ''this'' keywords in Java with practical examples.
Differentiate between Abstract Class and Interface in Java with syntax.
Explain the Exception Handling mechanism using try, catch, throw, throws, and finally.
How to create User-Defined Custom Exceptions in Java? Write a program.
Describe Java Thread Lifecycle and explain Thread creation using Runnable interface.
Explain Thread Synchronization with synchronized method example.
What are Java Packages? How to create, compile, and import user-defined packages?
Explain byte stream vs character stream classes in Java I/O package.',
    true
)
ON CONFLICT DO NOTHING;
