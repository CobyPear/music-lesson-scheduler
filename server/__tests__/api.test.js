
const request = require('supertest')



describe("GET / ", () => {
    test(`It should respond with 'API is running... on port ${PORT}`, async (done) => {
        request(server)
            .get('/')
            .expect(200)
            .end((err, resp) => {
                if (err) {
                    return done(err)
                }
                return done()
            })
    })
})