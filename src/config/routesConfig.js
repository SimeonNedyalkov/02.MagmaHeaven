const { allVolcanoesRouter } = require('../controllers/catalog')
const { createRouter } = require('../controllers/create')
const { detailsRouter } = require('../controllers/details')
const { editAndDeleteRouter } = require('../controllers/editAndDelete')
const {homeRouter} = require('../controllers/homeController')
const { searchRouter } = require('../controllers/searchController')
const { userRouter } = require('../controllers/userController')
function configRoutes(app){
    app.use(homeRouter) 
    app.use(searchRouter)
    app.use(allVolcanoesRouter)
    // users
    app.use(userRouter)
    // createVolcano
    app.use(createRouter)
    // details
    app.use(detailsRouter)
    // edit and delete
    app.use(editAndDeleteRouter)
}
module.exports = {
    configRoutes
}