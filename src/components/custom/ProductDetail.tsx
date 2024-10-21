import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3, MessageSquare, Star, ThumbsUp } from "lucide-react";
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
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/redux/api/productSlice";
import BubbleLoader from "./Loader";


export default function ProductDashboard() {
  const { id } = useParams();
  console.log("id", id);
  if (!id || id == undefined) {
    alert("Invalid route followed..");
    return;
  }

  const { data: productData, isLoading } = useGetProductByIdQuery(id);
  console.log("productData", productData);

  if (isLoading || productData == undefined) {
    return <BubbleLoader/>
  }

  const getPositiveSentimentPercentage = () => {
    const totalSentimentCount = productData.data.sentimentsRatio.reduce(
      (total, cur) => total + cur.count,
      0
    );

    //make sure positive is set at 0th position.
    const positive = productData.data.sentimentsRatio[0].count;
    const positivePercentage = (positive / totalSentimentCount) * 100;
    console.log("positivePercentage", positivePercentage);

    return positivePercentage.toFixed(1);
  };

  const getDiscrepancyPercentage = () => {
    const totalDiscrepancies = productData.data.discrepancies;
    const totalReviews = productData.data.totalReviews;
    const percentage = (totalDiscrepancies / totalReviews) * 100;
    return percentage.toFixed(1);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Product Dashboard</h1>
          <p className="text-xl text-muted-foreground">{productData.data.name}</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <Star className="mr-2 h-4 w-4 fill-primary" />
          {productData.data.averageRating}
        </Badge>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {productData.data.totalReviews}
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
              {productData.data.averageRating}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Positive Sentiment
            </CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getPositiveSentimentPercentage()}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Discrepancies in Reviews
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* {discrepancies > 50 ? (
                <ArrowUp className="inline mr-2 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="inline mr-2 h-4 w-4 text-red-500" />
              )} */}
              {getDiscrepancyPercentage()}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productData.data.ratingDistribution}>
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#0891b2" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sentiment: {
                  label: "Sentiment",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productData.data.sentimentsRatio}>
                  <XAxis dataKey="type" />
                  <YAxis domain={[0, 1]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="var(--color-sentiment)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Areas of Improvement</CardTitle>
            <CardDescription>Based on user feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {productData.data.improvements?.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.improvement}</span>
                  <Badge variant="secondary">{item.count}%</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Common Issues</CardTitle>
            <CardDescription>Frequently reported problems</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {productData.data.commonIssues.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.issue}</span>
                  <Badge variant="destructive">{item.count}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productData.data.recentReviews.map((review, index) => (
                <TableRow key={index}>
                  <TableCell>John Doe</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      <Star className="mr-1 h-4 w-4 fill-primary" />
                      {review.rating}
                    </Badge>
                  </TableCell>
                  <TableCell>{review.reviewMessage.slice(0, 200)}...</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
