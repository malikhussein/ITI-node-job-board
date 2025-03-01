import companyModel from "../models/company.model.js";
import userModel from "../models/user.model.js";


  // Todo chek the role is employer

export const register = async (req, res) => {

  const {role,id:userId}= req.user

  // Todo chek the user  is exist 

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'user does not exist' });
  }

  if (role!=="employer") {

    return res.status(403).json({message:"you are not allowed to create company"})

  }

  try { 
    

    const { name, industry, website } = req.body;

    const company = await companyModel.create({ name, industry, website,id:userId });

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


 //  chek any login-user  can display-- using middleware

export const displayCompanyByid = async (req, res) => {

    try {
        const{id:companyId} =req.params

        const FoundedCompany =companyModel.findById({companyId})

        if (!FoundedCompany) {
            
            res.status(400).json({message:"Company Not Found"})
        }
        
        else{
            res.status(200).json(FoundedCompany)
        }
    
    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }



};

  // Todo chek the role is employer

export const UpdateCompany = async (req, res) => {

  const userId = req.role.id 

 owner= companyModel.findById(userId)

 if (!owner) {

  return res.status(403).json({message:"you are not the owner to upadate"})
  
 }

  if (req.user.role!=="employer") {

    return res.status(403).json({message:"you are not allowed to upadate"})
    
  }

try {
  
  const { name, industry, website } = req.body;

  const{id:companyId} =req.params


 const updatedCompany= companyModel.findByIdAndUpdate(companyId,{name,industry,website },{new:true})


res.status(200).json({message:updatedCompany})

} catch (error) {
  
  res.status(500).json({ error: error.message });

}
  
};

export const deleteCompany = async (req, res) => {

 const userId = req.role.id 

 owner= companyModel.findById(userId)

 if (!owner) {

  return res.status(403).json({message:"you are not the owner to upadate"})
  
 }
``
  
  if (req.user.role!=="employer"|| req.user.role!=="admin") {

    return res.status(403).json({message:"you are not allowed to delete"})
    
  }

try {
  
  const{id:companyId} =req.params


 const deletedCompany= companyModel.deleteOne({_id:companyId})


res.status(200).json({message:deletedCompany})

} catch (error) {
  
  res.status(500).json({ error: error.message });

}

  

};

export const getJobsByCompany = async (req, res) => {

  const{id:companyId} =req.params



};
