export type TGetAllProducts = {
  totalProducts: number;
  totalReviews: number;
  averageRating: number;
  topRatedProducts: {
    productId: string;
    name: string;
    avgRating: number;
  }[];
};

export type getAllProductsResponse = {
  data: TGetAllProducts;
  message: string;
  error: string;
};

export type TGetProductById = {
  id: string;
  name: string;
  totalReviews: number;
  averageRating: number;
  sentimentsRatio: {
    type: string
    count: number
  }[];
  discrepancies: number;
  commonIssues: {
    issue: string;
    count: number;
  }[];
  improvements: {
    improvement: string;
    count: number;
  }[];
  ratingDistribution: {
    rating: number;
    count: number;
  }[];
  recentReviews: {
    date: number;
    rating: number;
    reviewMessage: string;
  }[];
};

export type getProductByIdResponse = {
  data: TGetProductById;
  message: string;
  error: string;
};
