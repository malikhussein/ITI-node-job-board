import companyModel from "../models/company.model.js";
import jobModel from "../models/job.model.js";
import userModel from "../models/user.model.js";



export const register = async (req, res) => {

  const {role,id:userId}= req.user

  //  chek the user  is exist 

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'user does not exist' });
  }

    //  chek the role is employer

  if (role!=="employer") {

    return res.status(403).json({message:"you are not allowed to create company"})

  }

  const { name, industry, website } = req.body;

  if (!name||!industry||!website) {
    
    return res.status(400).json({message:"please complete all fields"})
  }

  try { 
    


    const company = await companyModel.create({ name, industry, website,createdBy:userId });

    res.status(201).json({ message: "company is created", company });

    
  } catch (error) {

    res.status(500).json({ error: error.message });

    
  }
      
  
};

  //  chek that he is login only using middleware

export const displayCompanies = async (req, res) => {

  try {
    const foundedCompany = await companyModel.find({});

    res.status(200).json({ foundedCompany });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


 //  check any login-user  can display-- using middleware

export const displayCompanyByid = async (req, res) => {

    try {
        const{id:companyId} =req.params

        const FoundedCompany =await companyModel.findById(companyId)

        if (!FoundedCompany) {
            
            res.status(400).json({message:"Company Not Found"})
        }
        
        else{
            res.status(200).json({message:FoundedCompany})
        }
    
    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }



};

  //  chek the role is employer

export const UpdateCompany = async (req, res) => {

  const userId = req.user.id 

 owner= companyModel.findOne({createdBy:userId})

 if (!owner) {

  return res.status(403).json({message:"you are not the owner to upadate"})
  
 }

  if (req.user.role!=="employer") {

    return res.status(403).json({message:"you are not allowed to upadate"})
    
  }

try {
  
  const { name, industry, website } = req.body;

  const{id:companyId} =req.params


 const updatedCompany=await companyModel.findByIdAndUpdate(companyId,{name,industry,website },{new:true})


res.status(200).json({message:updatedCompany})

} catch (error) {
  
  res.status(500).json({ error: error.message });

}
  
};

export const deleteCompany = async (req, res) => {

 const userId = req.user.id 

 owner= await companyModel.findOne({createdBy:userId})

 if (!owner) {

  return res.status(403).json({message:"you are not the owner to delete"})
  
 }
``
  
  if (req.user.role!=="employer"|| req.user.role!=="admin") {

    return res.status(403).json({message:"you are not allowed to delete"})
    
  }

try {
  
  const{id:companyId} =req.params


 const deletedCompany=await companyModel.deleteOne({_id:companyId})


res.status(200).json({message:deletedCompany})

} catch (error) {
  
  res.status(500).json({ error: error.message });

}

};

export const getJobsByCompany = async (req, res) => {

  try {
const{id:companyId} =req.params

const Companyjobs= await jobModel.find({company:companyId})

res.status(200).json({message:Companyjobs})
    
  } catch (error) {

    res.status(500).json({ error: error.message });
    
  }


};
