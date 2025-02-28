import companyModel from "../models/company.model.js";

export const register = async (req, res) => {

  // Todo chek the role is employer

  const {role}= req.user
  if (role=="employer") {

  try {
    const { name, industry, website } = req.body;

    const company = await companyModel.create({ name, industry, website });

    res.status(201).json({ message: "company is created", company });
      
    }
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  else{
   return  res.json({message:"you are not allowed "})
  }
};

export const displayCompanies = async (req, res) => {
  // Todo chek that he is login only

  try {
    const foundedCompany = await companyModel.find({});

    res.status(200).json({ foundedCompany });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


 // Todo chek user  can display

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

export const UpdateCompany = async (req, res) => {


  if (req.user.role!=="employer") {

    return res.json({message:"you are not allowed to upadate"})
    
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


  
  if (req.user.role!=="employer"|| req.user.role!=="admin") {

    return res.json({message:"you are not allowed to delete"})
    
  }

try {
  
  const { name, industry, website } = req.body;

  const{id:companyId} =req.params


 const deletedCompany= companyModel.deleteOne({_id:companyId})


res.status(200).json({message:deletedCompany})

} catch (error) {
  
  res.status(500).json({ error: error.message });

}

  

};

export const getJobsByCompany = async (req, res) => {};
