var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};

        db.collection('notes').findOne(details, (err, item) => {
            err ? res.send({'error':'An error has occurred'}) : res.send(item);;
        });
    });

    app.post('/notes', (req, res) => {
        const note = { 
            title: req.body.title, 
            body: req.body.body 
        };

        db.collection('notes').insertOne(note, (err, result) => {
            err ? res.send({'error': 'An error has occurred'}) : res.send(result.ops[0]);
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection('notes').remove(details, (err, item) => {
            err ? res.send({'error': 'An error has occurred'}) : res.send('Note ' + id + ' deleted!');
        });
    });
};
