import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  Star,
  ThumbsUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "@/redux/api/productSlice";
import BubbleLoader from "./Loader";

// Mock data
const monthlySales = [
  { month: "Jan", sales: 65000 },
  { month: "Feb", sales: 72000 },
  { month: "Mar", sales: 68000 },
  { month: "Apr", sales: 75000 },
  { month: "May", sales: 82000 },
  { month: "Jun", sales: 88000 },
];

const categoryDistribution = [
  { category: "Electronics", count: 450 },
  { category: "Clothing", count: 300 },
  { category: "Home & Garden", count: 200 },
  { category: "Sports", count: 150 },
  { category: "Books", count: 100 },
];

const Home = () => {
  const totalSales = 500000;
  const salesGrowth = 15;
  const navigate = useNavigate();

  const { data: allProducts, isLoading } = useGetAllProductsQuery();
  console.log(allProducts);

  if (isLoading || allProducts == undefined) {
    return <BubbleLoader />;
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          All Products Performance
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allProducts.data.totalProducts}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalSales.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allProducts.data.totalReviews}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allProducts.data.averageRating.toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>
            Based on sales volume and customer ratings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProducts.data.topRatedProducts?.map((product) => (
                <TableRow
                  key={product.productId}
                  onClick={() => navigate(`/${product.productId}`)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>193</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      <Star className="mr-1 h-4 w-4 fill-primary" />
                      {product.avgRating.toFixed(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sales: {
                  label: "Sales",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySales}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="var(--color-sentiment)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Product Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryDistribution}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Sales Growth</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {salesGrowth > 0 ? (
                <ArrowUp className="inline mr-2 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="inline mr-2 h-4 w-4 text-red-500" />
              )}
              {salesGrowth}%
            </div>
            <p className="text-xs text-muted-foreground">
              Compared to last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Best Selling Category</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categoryDistribution[0].category}
            </div>
            <p className="text-xs text-muted-foreground">
              {categoryDistribution[0].count} products sold
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
