from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()

class Record(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True)
    text = Column(String)
    sentiment = Column(String)
    polarity = Column(Float)
    subjectivity = Column(Float)

engine = create_engine("sqlite:///data.db")
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)