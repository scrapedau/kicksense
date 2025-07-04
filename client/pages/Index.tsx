import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Video, VideoOff, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import BluetoothIndicator from "@/components/BluetoothIndicator";

export default function Index() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Faf267b38e7f649e5aba7b44dad4417a9%2Fc3a4084173bf4fd5ac0199efccbcbd48?format=webp&width=800"
                alt="KickSense"
                className="h-8 w-auto"
              />
            </div>
            <BluetoothIndicator />
          </div>

          {/* Hero Section */}
          <Card className="bg-gradient-to-br from-primary/5 via-primary/5 to-secondary/5 border-primary/20 mb-6">
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
            <CardContent className="text-center space-y-4">
              <Link to="/live?video=true">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mb-5 sm:mb-0"
                >
                  <Video className="w-5 h-5 mr-2" />
                  Record Data with Video
                </Button>
              </Link>
              <Link to="/live?video=false">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10 font-semibold"
                >
                  <VideoOff className="w-5 h-5 mr-2" />
                  Record Data without Video
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Personal Bests */}
        <div className="px-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Personal Bests
          </h2>

          <div className="space-y-3">
            <Card className="border border-border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Field Goal Foot Speed
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Personal best
                      </p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-foreground">72 mph</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Punt Foot Speed
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Personal best
                      </p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-foreground">68 mph</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Kickoff Foot Speed
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Personal best
                      </p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-foreground">75 mph</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Session History */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-foreground">
                Session History
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Dec 15, 2024
                  </p>
                  <p className="text-xs text-muted-foreground">
                    45 kicks • 32 min
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-secondary">72 mph</p>
                  <p className="text-xs text-muted-foreground">Peak speed</p>
                </div>
              </div>

              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Dec 12, 2024
                  </p>
                  <p className="text-xs text-muted-foreground">
                    38 kicks • 28 min
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-secondary">69 mph</p>
                  <p className="text-xs text-muted-foreground">Peak speed</p>
                </div>
              </div>

              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Dec 10, 2024
                  </p>
                  <p className="text-xs text-muted-foreground">
                    52 kicks • 35 min
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-secondary">74 mph</p>
                  <p className="text-xs text-muted-foreground">Peak speed</p>
                </div>
              </div>

              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Dec 8, 2024
                  </p>
                  <p className="text-xs text-muted-foreground">
                    29 kicks • 22 min
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-secondary">66 mph</p>
                  <p className="text-xs text-muted-foreground">Peak speed</p>
                </div>
              </div>

              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Dec 5, 2024
                  </p>
                  <p className="text-xs text-muted-foreground">
                    41 kicks • 30 min
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-secondary">70 mph</p>
                  <p className="text-xs text-muted-foreground">Peak speed</p>
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
