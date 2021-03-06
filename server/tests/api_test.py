import os

os.environ["__TEST__"] = "1"

from snapshottest import TestCase
from database import db_session, init_db, Base, engine
from graphene.test import Client
from models import *
from schemas import schema
import datetime


class NewDate(datetime.date):
    @classmethod
    def today(cls):
        return cls(2010, 1, 1)


datetime.date = NewDate


class TestAPI(TestCase):
    def setUp(self):
        init_db()
        self.client = Client(schema)
        user = User(name="Foo", password="bar")
        post = Post(author=user, title="Test", content="Test Content")
        comment = Comment(author=user, post=post, content="Comment Test")
        db_session.add_all([user, post, comment])
        db_session.commit()

    def tearDown(self):
        Base.metadata.drop_all(bind=engine)

    def test_users(self):
        self.assertMatchSnapshot(
            self.client.execute("""{ users { edges { node { id name posts { edges { node {id title}}} }}}}"""))

    def test_posts(self):
        self.assertMatchSnapshot(
            self.client.execute("""{ posts { edges { node { id title content author { id name } }}}}"""))

    def test_invalid_search(self):
        self.assertMatchSnapshot(
            self.client.execute("""{ post }"""))

    def test_post(self):
        self.assertMatchSnapshot(
            self.client.execute("""{ post(id: "UG9zdDox") { id title content author { id name }}}"""))

    def test_post_comment(self):
        self.assertMatchSnapshot(
            self.client.execute(
                """{ post(id: "UG9zdDox") { id title content comments { edges { node {  id author {id name} }}}}}"""))

    def test_login(self):
        self.assertMatchSnapshot(
            self.client.execute("""mutation { login(name: "Foo", password: "bar") { token } }"""))

    def test_login_fail(self):
        try:
            self.assertMatchSnapshot(
                self.client.execute("""mutation { login(name: "Foo", password: "a") { token } errors }"""))
        except:
            pass
