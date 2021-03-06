import datetime
from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from .Tag import tagIdentifier


class Post(Base):
    """
    The SQLAlchemy model for Post class
    """
    __tablename__ = "post"

    id = Column(Integer, primary_key=True)
    publishDate = Column(DateTime)
    lastUpdateDate = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

    title = Column(Text, nullable=False)
    excerpt = Column(Text)
    content = Column(Text, nullable=False)

    # relationships
    authorId = Column(Integer, ForeignKey('user.id'))
    author = relationship("User", back_populates="posts")
    tags = relationship("Tag", secondary=tagIdentifier, back_populates="posts")
    comments = relationship("Comment", back_populates="post")
    categoryId = Column(Integer, ForeignKey('category.id'))
    category = relationship("Category", back_populates="posts")

    def __repr__(self):
        return '<Post %r by %r>' % (self.title, self.author)
