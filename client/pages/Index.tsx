import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Zap, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

export default function Index() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">KickSense</h1>
              <p className="text-muted-foreground">
                Football Kicking Analytics
              </p>
            </div>
            <Badge
              variant="secondary"
              className="bg-secondary/20 text-secondary border-secondary/30"
            >
              <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse" />
              Ready
            </Badge>
          </div>

          {/* Hero Section */}
          <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 border-primary/30 mb-6">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-foreground">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Ready to analyze your kicking performance?
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/live">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start Session
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="px-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Quick Stats
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">87%</p>
                    <p className="text-xs text-muted-foreground">
                      Accuracy Rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">68</p>
                    <p className="text-xs text-muted-foreground">
                      Avg Speed mph
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Session */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-foreground">
                Last Session
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Dec 15, 2024
                  </p>
                  <p className="text-xs text-muted-foreground">
                    45 kicks • 32 min
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-secondary">
                    92% accuracy
                  </p>
                  <p className="text-xs text-muted-foreground">72 mph peak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
