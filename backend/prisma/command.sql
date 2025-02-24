-- Switch to your database if needed (optional)
-- \c my_database_name;

-- 1. Insert Users
INSERT INTO "User" (name, email)
VALUES
  ('Alice', 'alice@example.com'),
  ('Bob',   'bob@example.com'),
  ('Charlie', 'charlie@example.com');

-- 2. Insert Profiles (one-to-one with User)
INSERT INTO "Profile"(bio, "userId")
VALUES
  ('Bio for Alice', 6),
  ('Bio for Bob',   7);
  -- (No profile for Charlie for demonstration)

-- 3. Insert Categories
INSERT INTO "Category"(name)
VALUES
  ('Technology'),
  ('Lifestyle'),
  ('Random');

-- 4. Insert Posts (one-to-many: User -> Post, Category -> Post)
INSERT INTO "Post"(title, content, "authorId", "categoryId")
VALUES
  ('First Post', 'Hello world!', 6, 1),  -- Author: Alice, Category: Technology
  ('Second Post', 'Another sample post', 7, 2), -- Author: Bob, Category: Lifestyle
  ('Tech Tips', 'Tech tips for coding', 6, 1);  -- Author: Alice, Category: Technology

-- 5. Insert Comments (each comment belongs to one User and one Post)
INSERT INTO "Comment"(content, "postId", "authorId")
VALUES
  ('Nice job!', 1, 7), -- Post #1 by Bob
  ('Thanks for sharing!',1, 8), -- Post #1 by Charlie
  ('Interesting read...',2, 6); -- Post #2 by Alice

-- 6. Insert Tags
INSERT INTO "Tag"(name)
VALUES
  ('WebDev'),
  ('Lifestyle'),
  ('Coding');

-- 7. Insert Post-Tag relationships (many-to-many)
-- Prisma by default creates a relation table named "_PostToTag"
-- with columns "A" (for Post ID) and "B" (for Tag ID).
INSERT INTO "_PostToTag"("A", "B")
VALUES
  (1, 1),  -- Post #1 tagged "WebDev"
  (1, 3),  -- Post #1 tagged "Coding"
  (2, 2),  -- Post #2 tagged "Lifestyle"
  (3, 1),  -- Post #3 tagged "WebDev"
  (3, 3);  -- Post #3 tagged "Coding"
--------------------

SELECT * FROM "User";
SELECT * FROM "Profile";
SELECT * FROM "Post";
SELECT * FROM "Comment";
SELECT * FROM "Tag";
SELECT * FROM "_PostToTag";
SELECT * FROM "Category";


----------------------
User → Posts:
SELECT u.name AS user_name, p.title AS post_title
FROM "User" u
JOIN "Post" p ON u.id = p."authorId";

User, Post, and Comments:
SELECT u.name AS author, p.title AS post_title, c.content AS comment
FROM "Comment" c
JOIN "User" u ON c."authorId" = u.id
JOIN "Post" p ON c."postId"   = p.id;

Many-to-Many (Posts ↔ Tags)
SELECT p.title AS post_title, t.name AS tag_name
FROM "_PostToTag" pt
JOIN "Post" p ON pt."A" = p.id
JOIN "Tag"  t ON pt."B" = t.id
ORDER BY p.id;

Categorized Posts
SELECT p.title, c.name AS category
FROM "Post" p
JOIN "Category" c ON p."categoryId" = c.id;

Combine User, Profile, Post, and Comment in One Query
SELECT
  u.id          AS user_id,
  u.name        AS user_name,
  prof.bio      AS user_bio,
  p.id          AS post_id,
  p.title       AS post_title,
  p.content     AS post_content,
  c.id          AS comment_id,
  c.content     AS comment_content
FROM "User" u
LEFT JOIN "Profile" prof
  ON u.id = prof."userId"
LEFT JOIN "Post" p
  ON u.id = p."authorId"
LEFT JOIN "Comment" c
  ON p.id = c."postId"
ORDER BY u.id, p.id, c.id;

Show Tags for Each Post Along With Post and Author
p (_PostToTag) with the Post and User info
SELECT
  p.id       AS post_id,
  p.title    AS post_title,
  u.name     AS author_name,
  t.name     AS tag_name
FROM "_PostToTag" pt
JOIN "Post" p
  ON pt."A" = p.id
JOIN "User" u
  ON p."authorId" = u.id
JOIN "Tag" t
  ON pt."B" = t.id
ORDER BY p.id, t.id;

Combine Posts with Category and Tag Count
SELECT
  p.id      AS post_id,
  p.title   AS post_title,
  c.name    AS category_name,
  COUNT(t.id) AS tag_count
FROM "Post" p
JOIN "Category" c
  ON p."categoryId" = c.id
LEFT JOIN "_PostToTag" pt
  ON p.id = pt."A"
LEFT JOIN "Tag" t
  ON pt."B" = t.id
GROUP BY p.id, c.id
ORDER BY p.id;


------------------
Experiment Further
Feel free to modify or expand this data to explore more advanced SQL queries (e.g., grouping, subqueries, filtering).