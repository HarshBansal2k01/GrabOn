// creating features for the website
//Search / Filter / Pagination

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            // "i" basically will also consider the case sensitive char
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    // will return the same class
    return this;
  }

  filter() {
    // since objects are pass by reference and queryStr is a obj so we have to use spread opearator
    //to make a new copy

    const queryCopy = { ...this.queryStr };

    // Remove some fields for category
    // when we filter items we have to remove this words from url
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    
    // Filter for price and rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`);
    
    //this.query means product.find() method
    
    this.query = this.query.find(JSON.parse(queryStr));    
    return this;
  }

  pagination(resultPerPage){
    const currentPage = Number(this.queryStr.page) || 1;

    //if have to skip page item 
    const skip = resultPerPage * (currentPage-1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
