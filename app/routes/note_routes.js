var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        const note = { 
            title: req.body.title, 
            body: req.body.body 
        };

        db.collection('notes').insertOne(note, (err, result) => {
            err ? res.send({'error': 'An error has occurred'}) : res.send(result.ops[0]);
        });
    });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};

        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
};
