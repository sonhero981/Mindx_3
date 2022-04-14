# 1. Danh sách tất cả sản phẩm có category là "Quần áo"
```js
const products = await ProductModel.find({category: "Quần áo" })
```

# 2. Danh sách sản phẩm có giá bán từ 50000 đến 100000

```js 
const products = await ProductModel.find({price: {$gte: 50000, $lte: 100000}})
```

# 3. Danh sách sản phẩm có title hoặc description chứa từ khóa "áo" (không phân biệt hoa thường)
```js
const filter = {}
const regex = new RegExp("áo", "i")
const regexCond = {$regex: regex}
filter['$or'] = [
    {title: regexCond},
    {description: regexCond}
]

const products = await ProductModel.find(filter)
```

# 4. Danh sách sản phẩm không thể bán (hết số lượng tồn kho)

```js
const products = await ProductModel.find({stockQuantity: {$eq: 0}})
```

# 5. Danh sách sản phẩm được đánh giá cao (có rating lớn hơn hoặc bằng 4)

```js 
const products = await ProductModel.find({rating: {$gte: 4}})
```

# 6. Danh sách sản phẩm trending (có lượt view từ 2000) sắp xếp theo chiều giảm dần số view

```js 
const products = await ProductModel
                    .find({viewCount: {$gte: 2000}})
                    .sort({viewCount: -1})
```

# 7. Danh sách sản phẩm có tags là "nam"

```js
const products = await ProductModel.find({tags: "nam"})
```

# 8. Danh sách sản phẩm theo giá bán tăng dần

```js
const products = await ProductModel.find({}).sort({price: 1}) 
```

# 9. Danh sách sản phẩm thuộc danh mục "Quần áo" bán chạy (số lượng bán ra lớn hơn 100) sắp xếp theo bảng chữ cái alphabet tăng dần của title

```js 
const products = await ProductModel.find({$and: [{category: "quần áo"}, { sellQuantity: {$gt: 1000}}]}).sort({title: 1})
```

# 10. [Nâng cao] Cho từ khoá "khăn quang" (Người dùng nhập từ khăn có dấu còn từ quàng không có dấu), làm thế nào để ra được danh sách các sản phẩm có từ khoá "khăn quàng"