const { ObjectId } = require('mongodb');
const User = require('../Schema/User_modal');

//moduleScaffolding
const usersController = {};

//get profile data
usersController.getProfile = async (req, res) => { 
    try{
        const userProfile = await User.where({ email: req?.userEmail }).findOne();
        console.log(userProfile);
        res.status(200).json(userProfile);
    }catch(err){
        res.status(500).json({
            error: 'data fetch failed'
        });
    }
};

// //load student data by roll
// usersController.searchStudent = (req, res) => {
//     students.findOne({
//         $or: [{name: req?.body?.name}, {roll: req?.body?.roll}]
//     }, (err, data) => {
//         if(err){
//             res.status(500).json({
//                 error: 'data fetch failed'
//             });
//         }else{
//             res.status(200).json(data);
//         }
//     })
// }

// //load student data by id
// usersController.loadStudentDataById = (req, res) => {
//     const query = { _id: ObjectId(req.params.id) };
//     students.findOne(query, (err, data) => {
//         if(err){
//             res.status(500).json({
//                 error: 'data fetch failed'
//             });
//         }else{
//             res.status(200).json(data);
//         }
//     })
// }

//add a new student
usersController.addNewUser = async (req, res) => {
    try{
        const { firstName, lastName, birthDate } = req.body;

        const updateUserProfile = await User.findOneAndUpdate({ email: req?.userEmail }, { firstName, lastName, birthDate });

        res.status(200).json({
            message: 'Profile update successfully'
        })
    }catch(e){
        res.status(500).json({
            error: 'Profile update failed'
        })
    }
}

// usersController.
// updateStudentInfoByID = (req, res) => {
//     const query = {_id: ObjectId(req.params.id)};
//     const payload = {$set: req.body};

//     students.updateOne(query, payload, (err, data) => {
//         if(err){
//             res.status(500).json({
//                 error: 'data update failed'
//             });
//         }else{
//             res.status(200).json(data);
//         }
//     })
// }

// //delete a single student
// usersController.deleteStudentById = async (req, res) => {
//     try{
//         let query = {_id: ObjectId(req.params.id)};
//         let result = await students.deleteOne(query);
        
//         res.status(200).json(result);
        
//     }catch{
//         res.status(500).json({
//             error: 'data delete Failed'
//         })
//     }
// }

// //update multiple status
// usersController.updateMultipleStatusActive = (req, res) => {
//     const {status} = req.body;

//     let objId = status. map(s => ObjectId(s));

//     students.updateMany({_id: {$in: objId}}, {$set: {status: 'active'}}, (err, data) => {
//         if(err){
//             res.status(500).json({
//                 error: 'data update failed'
//             });
//         }else{
//             res.status(200).json(data);
//         }
//     })
// }

// usersController.updateMultipleStatusInActive = (req, res) => {
//     const {status} = req.body;

//     let objId = status.map(s => ObjectId(s));

//     students.updateMany({_id: {$in: objId}}, {$set: {status: 'inActive'}}, (err, data) => {
//         if(err){
//             res.status(500).json({
//                 error: 'data update failed'
//             });
//         }else{
//             res.status(200).json(data);
//         }
//     })
// }

// usersController.updateMultipleStatus = async (req, res) => {
//     const { action, statusIDList} = req.body;
//     let statusObjID = statusIDList.map(item => ObjectId(item));

//     if(action === 'Active'){
//         try {
//             let result =  await students.updateMany({_id: {$in: statusObjID}}, {$set: {status: 'active'}});
//             res.send(result);
//         } catch (error) {
//             res.status(500).json({
//                 error: "Internal Server Error"
//             })
//         }
//     }else if(action === 'Inactive'){
//         try {
//             let result = await students.updateMany({_id: {$in: statusObjID}}, {$set: {status: 'inActive'}});
//             res.send(result);
//         } catch (error) {
//             res.status(500).json({
//                 error: "Internal Server Error"
//             })
//         }
//     }
// }

// usersController.deleteMultipleStudent = async (req, res) => {
//     try {
//             const {statusIDList} = req.body;
//             const query = statusIDList.map(i => ObjectId(i));
//             const result = await students.deleteMany({_id: {$in: query}});
        
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).json({
//             error: 'data delete Failed'
//         })
//     }
// }

module.exports = usersController;