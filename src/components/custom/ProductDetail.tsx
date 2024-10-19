import { useState } from "react";
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
  BarChart3,
  MessageSquare,
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

// Mock data
const ratingDistribution = [
  { rating: 5, count: 450 },
  { rating: 4, count: 300 },
  { rating: 3, count: 150 },
  { rating: 2, count: 50 },
  { rating: 1, count: 50 },
];

const sentimentTrend = [
  { type: "Positive", count: 20 },
  {
    type: "Neutral",
    count: 5,
  },
  { type: "Negative", count: 8 },
];

const improvements = [
  { area: "Battery Life", percentage: 15 },
  { area: "Camera Quality", percentage: 10 },
  { area: "User Interface", percentage: 8 },
];

const commonIssues = [
  { issue: "Slow Charging", count: 50 },
  { issue: "App Crashes", count: 30 },
  { issue: "Bluetooth Connectivity", count: 25 },
];

const recentReviews = [
  {
    id: 1,
    user: "John D.",
    rating: 4,
    comment: "Great product, but battery life could be better.",
  },
  {
    id: 2,
    user: "Sarah M.",
    rating: 5,
    comment: "Absolutely love it! The camera quality is amazing.",
  },
  {
    id: 3,
    user: "Mike R.",
    rating: 3,
    comment: "Decent, but having issues with app crashes.",
  },
];
const discrepancies = 60;

export default function ProductDashboard() {
  const [averageRating] = useState(4.2);
  const [totalReviews] = useState(1000);
  const [positivePercentage] = useState(85);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Product Dashboard</h1>
          <p className="text-xl text-muted-foreground">SmartPhone X Pro</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <Star className="mr-2 h-4 w-4 fill-primary" />
          {averageRating.toFixed(1)}
        </Badge>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
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
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
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
            <div className="text-2xl font-bold">{positivePercentage}%</div>
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
              {discrepancies}%
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
                <BarChart data={ratingDistribution}>
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
                <LineChart data={sentimentTrend}>
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
              {improvements.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.area}</span>
                  <Badge variant="secondary">{item.percentage}%</Badge>
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
              {commonIssues.map((item, index) => (
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
              {recentReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      <Star className="mr-1 h-4 w-4 fill-primary" />
                      {review.rating}
                    </Badge>
                  </TableCell>
                  <TableCell>{review.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
