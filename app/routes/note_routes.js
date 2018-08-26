module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        const note = { title: req.body.title, body: req.body.body };

        db.collection('notes').insertOne(note, (err, result) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        })
    });
};
