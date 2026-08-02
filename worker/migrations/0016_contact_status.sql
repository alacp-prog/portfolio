-- Adds a read/treated status to contacts so the admin can track which
-- submissions still need a reply.
ALTER TABLE contacts ADD COLUMN status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'treated'));
