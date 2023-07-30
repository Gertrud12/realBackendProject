import product from "../models/productModel.js"

const createProduct = async (req, res) =>{
    try{
        const {name, description, price, image, quantity, category} = req.body
        const newProduct = await new product ({
            name,
            description,
            price,
            image,
            quantity,
            category
        })
        const saveProduct = await newProduct.save()
        if(saveProduct){
            res.json({message: "product successfully created", saveProduct})
        }
        else{
            res.status(400).json({message: "unable to create new product"})
        }

    }catch(err){
        throw new Error(err)
    }
};


const allProducts = async(req, res) => {

    try{
        const allProducts = await product.find({})
        if(allProducts){
            res.json({message: 'product fetched', allProducts})
        }else{
            res.status(400).json({message: 'product not fetched'})
        }
    }catch(err){
        throw new Error(err)
    }
};


// get single product
const singleProduct = async (req, res) => {
	try {
		const oneProduct = await product.findById(req.params.id)
		if(oneProduct){
			res.json({message: "Product retrieved", oneProduct})
		}else{
			res.status(400).json({message: "Error loading Products"})
		}
	} catch (err) {
		throw new Error(err);
	}
};

//getNewProduct
const getNewProduct =async (req, res) => {
    try{
        const newProduct = await product.find({}).sort({createAt: -1}).limit(8)
        if(newProduct){
            res.json({message: "Product found", newProduct})
        }
        else{
            res.status(400).json({message: "Product not found"})
        }
    }
    catch(err){
        throw new Error(err)
    }
}

//getTopProducts
const getTopProduct = async (req, res) => {
    try{
        const topProduct = await product.find({}).limit(6)
        if(topProduct){
            res.json({message: "Top products displayed", topProduct})
        }
        else{
            res.status(400).json({message: "Top products not found"})
        }
    }
    catch(err){
        throw new Error(err)
    }
}

//getTopSales
const topSales = async (req, res) => {
    try {
      const topSales = await product.find().sort({ salesCount: -1 }).limit(10);
      if(topSales){
        res.json({message: "product fetched", topSales})
      }else{
        res.status(400).json({ message: 'Failed to fetch top-selling products' });
      }  
    } catch (err) {
      throw new Error(err)
    }
  };


//getRelatedProduct
const getRelatedProduct = async(req, res) => {
    try {
        const relateProduct = await product.findById(req.params.id)
        if (relateProduct) {
            const related = await product.find({category: relateProduct.category}).limit(5)
            const actual = related.filter(p => p._id != relateProduct._id)
            res.json({message: "product retrieved", actual})
        } else {
            res.status(400).json('Product not found')
        }
    } catch (err) {
        throw new Error(err);
    }
}


//updateProduct
const updateProduct = async(req, res) => {
    try{
        const {name, price, category, image, isAvailable, isDiscount, quantity, discount, description } = req.body
        const upProduct = await product.findOne({_id: req.params.id})
        if(upProduct){
            const updateProduct = await product.findByIdAndUpdate(upProduct._id, {
                name: name ? name : upProduct.name,
                price: price ? price : upProduct.price,
                category: category ? category : upProduct.category,
                image: image ? image : upProduct.image,
                isAvailable: isAvailable ? isAvailable : upProduct.isAvailable,
                isDiscount: isDiscount ? isDiscount : upProduct.isDiscount,
                quantity: quantity ? quantity : upProduct.quantity,
                discount: discount ? discount : upProduct.discount,
                description: description ? description : upProduct.description
            },
            {
                new: true,
                useFindAndModify: false
            })

            if(updateProduct){
                res.json({message: 'product updated', updateProduct})
            }else{
                res.status(400).json({message: 'unable to update please try again'})
            }
        }else{
            res.status(400).json({message: 'product not found'})
        }
    }catch(err){
        throw new Error(err)
    }
}

//deleteProduct

const deleteProduct = async (req, res) => {
    try{
        const delProduct = await product.findOne({_id: req.params.id})
        if (delProduct){
            const deleteProduct = await product.findByIdAndDelete(delProduct._id)
            if (deleteProduct){
                res.json({message: "Product deleted", delProduct})
            }
            else{
                res.status(400).json({message: "Product not deleted"})
            }
        }
        else{
            res.status(400).json({message: "Product not found"})
        }
    }
    catch(err){
        throw new Error(err)
    }
}


export {createProduct, 
        allProducts, 
        singleProduct, 
        getNewProduct, 
        getTopProduct,
        topSales,
        getRelatedProduct,
        updateProduct,
        deleteProduct}