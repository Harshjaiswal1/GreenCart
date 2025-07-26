import Address from "../models/Address.js";

// Add Address : /api/address/add
export const addAddress = async (req, res)=> {
    try {
        // Get userId from authenticated user (middleware) instead of body
        const userId = req.userId;
        
        // Destructure all required fields from req.body
        const { 
            firstName,
            lastName,
            email,
            street,
            city,
            state,
            zipcode,
            country,
            phone
        } = req.body;

          // Convert zipcode to number if it comes as string
          const processedZipcode = typeof zipcode === 'string' 
          ? parseInt(zipcode, 10) 
          : zipcode;

      if (isNaN(processedZipcode)) {
          return res.status(400).json({
              success: false,
              message: "Zipcode must be a valid number"
          });
      }

        // Validate all required fields exist
        if (!firstName || !lastName || !email || !street || !city || 
            !state || !zipcode || !country || !phone) {
            return res.status(400).json({ 
                success: false, 
                message: "All address fields are required" 
            });
        }

        // Create address with all required fields
        const newAddress = await Address.create({
            userId,
            firstName,
            lastName,
            email,
            street,
            city,
            state,
            zipcode: processedZipcode,
            country,
            phone
        });

        res.json({
            success: true, 
            message: "Address Added Successfully",
            address: newAddress
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}

// Get Address : /api/address/get
export const getAddress = async (req, res)=> {
    try {
        // Get userId from authenticated user (middleware) instead of body
        const userId = req.userId;
        const addresses = await Address.find({userId});
        res.json({success: true, addresses});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}