//Saved DBML For Generate to ERD at https://dbdiagram.io/d

Table User {
  id        int       [pk, increment]
  name      varchar
  email     varchar
}

Table Profile {
  id        int       [pk, increment]
  bio       text
  userId    int       [unique]
}

Table Post {
  id         int       [pk, increment]
  title      varchar
  content    text
  authorId   int
  categoryId int
}

Table Comment {
  id        int       [pk, increment]
  content   text
  postId    int
  authorId  int
  createdAt datetime
}

Table Tag {
  id   int     [pk, increment]
  name varchar [unique]
}

Table Category {
  id   int     [pk, increment]
  name varchar [unique]
}

/*
  For the many-to-many relationship between Post and Tag,
  Prisma automatically manages an implicit join table.
  In DBML, you can model it explicitly as below:
*/
Table _PostToTag {
  postId int
  tagId  int

  // You can mark these as a composite primary key if you like:
  indexes {
    (postId, tagId) [unique]
  }
}

/*
  Define references to show one-to-many, one-to-one, and many-to-many relationships.
*/

Ref: Profile.userId > User.id             // 1:1 (User <-> Profile)
Ref: Post.authorId > User.id             // 1:N (User -> Post)
Ref: Comment.postId > Post.id            // 1:N (Post -> Comment)
Ref: Comment.authorId > User.id          // 1:N (User -> Comment)
Ref: Post.categoryId > Category.id       // 1:N (Category -> Post)

// Many-to-Many (Post <-> Tag) using the join table
Ref: _PostToTag.postId > Post.id
Ref: _PostToTag.tagId  > Tag.id
