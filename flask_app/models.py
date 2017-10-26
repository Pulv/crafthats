from flask_sqlalchemy import SQLAlchemy 
# from main import app

db = SQLAlchemy()

association_table = db.Table('association', db.metadata,
    db.Column('brewery_id',db.ForeignKey('brewery.id'), primary_key=True),
    db.Column('style_id',db.ForeignKey('style.id'),primary_key=True)
)

class Beer (db.Model):
    __tablename__ = "beer"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(64))
    organic = db.Column(db.String(8))
    abv = db.Column(db.String(8))
    ibu = db.Column(db.String(8))
    brewery_id = db.Column(db.Integer, db.ForeignKey('brewery.id'))
    style_id = db.Column(db.Integer, db.ForeignKey('style.id'))
    images = db.Column(db.String(80))
    reviews = db.relationship("Review", backref='beer', lazy='dynamic')


class Brewery (db.Model):
    __tablename__ = "brewery"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(64))
    city = db.Column(db.String(64))
    state = db.Column(db.String(64))
    country = db.Column(db.String(64))
    established = db.Column(db.String(64))
    description = db.Column(db.String(200))
    beers = db.relationship("Beer", backref="brewery", lazy="dynamic")
    images = db.Column(db.String(80))
    styles = db.relationship("Style",secondary=association_table, back_populates='breweries')


class Style (db.Model):
    __tablename__ = "style"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(40))
    description = db.Column(db.Text)
    ibu_min = db.Column(db.String(8))
    ibu_max = db.Column(db.String(8))
    abv_min = db.Column(db.String(8))
    abv_max = db.Column(db.String(8))
    
    beers = db.relationship("Beer", backref="style", lazy='dynamic')
    breweries = db.relationship("Brewery",secondary=association_table, back_populates='styles')


class Review (db.Model):
    __tablename__ = "review"
    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.String(24))
    rating = db.Column(db.String(64))
    comment = db.Column(db.Text)
    beer_name = db.Column(db.Integer, db.ForeignKey('beer.id'))
    #brewery_name = db.Column(db.Integer, db.ForeignKey('brewery.id'))





