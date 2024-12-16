const getHealth =async (req, res) =>{
    res.json({
        success:true,
        message:"server is running"
    })
}

export {getHealth} ;