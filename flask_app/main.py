import os
import socket
import logging
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy.orm import lazyload

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:downing@127.0.0.1/stagingdb'
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
 
from models import db, Beer, Review, Style, Brewery
# db = SQLAlchemy(app)
db.init_app(app)

@app.route('/1')
def home1():
    return "alternate"

@app.route('/')
def home():
    # x = db.session.query(Beer).all()
    return "hello world"

@app.route('/breweries', methods=['GET'])
def getBreweries():
    
    allBreweries = []

    breweries = db.session.query(Brewery).all()

    for brewery in breweries:
        for beer in brewery.beers.all():
            beersOfBrewery = []
            beersOfBrewery.append(beer.name)
        for style in brewery.styles.all():
            stylesOfBrewery = []
            stylesOfBrewery.append(style.name)

        #to do styles!
        
        b = {
            'id' : brewery.id,
            'name' : brewery.name,
            'city' : brewery.city,
            'state':brewery.state,
            'country' : brewery.country,
            'established': brewery.established,
            'description': brewery.description,
            'beers' : beersOfBrewery,
            'images' : brewery.images#,
            #'styles' : stylesOfBrewery
            }
        allBreweries.append(b)
    
    response = jsonify(allBreweriesweries)
    response.status_code = 200

    return response

@app.route('/beers', methods=['GET'])
def getBeers():
    
    allBeers = []

    beers = db.session.query(Beer).all()


    for beer in beers:
        
        b = {
         'id' : beer.id,
         'name' : beer.name,
         'organic' : beer.organic,
         'abv'  : beer.abv,
         'ibu'  : beer.ibu,
         'images' :beer.images,
         'brewery' : Brewery.query.filter_by(id=beer.brewery_id).first().name,
         'style' : Style.query.filter_by(id=beer.style_id).first().name
        }
        allBeers.append(b)

    response = jsonify(allBeers)
    response.status_code = 200

    return response
@app.route('/styles',methods=['GET'])
def getStyles():
    allStyles = []

    styles = db.session.query(Style).all()  
    for style in styles:
        for beer in style.beers.all():
            beersOfStyle = []
            beersOfStyle.append(beer.name)
        # for brewery in db.session.query(Brewery).filter(Style.breweries.any(id=style.id)).all():
        #     breweriesOfStyle = []
        #     breweriesOfStyle.append(brewery.name)

        s = {
        'id' : style.id,
        'name' : style.name,
        'desicription' : style.description,
        'ibu_min' : style.ibu_min,
        'ibu_max' : style.ibu_max,
        'abv_min' : style.abv_min,
        'abv_max' : style.abv_max,
        'beers' : beersOfStyle#,
        #'breweries':breweriesOfStyle
        }
        allStyles.append(s)

    response = jsonify(allStyles)
    response.status_code = 200

    return response

@app.route('/reviews', methods = ['GET'])
def getReviews():
    allReviews = []

    reviews = db.session.query(Review).all()

    for review in reviews:
        r = {
        'id' : review.id,
        'date': review.date,
        'rating' : review.rating,
        'comment' : review.comment,
        'beer_name' : Beer.query.filter_by(id=review.beer_name).first().name
        }
        allReviews.append(r)

    response = jsonify(allReviews)
    response.status_code = 200

    return response
@app.route('/beers/<id>', methods = ['GET'])
def getBeerInfo(id)
@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=5000, debug=True)

