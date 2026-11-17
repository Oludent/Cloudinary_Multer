const router = require('express').Router()

const {addStudent, getAllStudents, updateStudent} = require('../controllers/studentController')
const upload = require('../middleware/multer')

router.post('/addstudent', upload.single('profilePicture'), addStudent)
router.get('/allstudents', getAllStudents)
router.patch('/updatestudent/:id', upload.single('profilePicture'), updateStudent)


module.exports = router