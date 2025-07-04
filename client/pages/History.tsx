import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, TrendingUp, Target, Zap, ArrowUp } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

export default function History() {
  const sessions = [
    {
      id: 1,
      date: "Dec 15, 2024",
      time: "2:30 PM",
      duration: "32 min",
      kicks: 45,
      peakSpeed: 72,
      ballSpeed: 68,
      curvedLinearROM: 18.5,
      angularROM: 145,
      kickType: "field-goal" as const,
    },
    {
      id: 2,
      date: "Dec 12, 2024",
      time: "11:15 AM",
      duration: "28 min",
      kicks: 38,
      peakSpeed: 69,
      ballSpeed: 65,
      curvedLinearROM: 22.3,
      angularROM: 162,
      kickType: "punt" as const,
    },
    {
      id: 3,
      date: "Dec 10, 2024",
      time: "4:45 PM",
      duration: "35 min",
      kicks: 52,
      peakSpeed: 74,
      ballSpeed: 71,
      curvedLinearROM: 16.8,
      angularROM: 138,
      kickType: "kickoff" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-6 pt-8 pb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Session History
          </h1>
          <p className="text-muted-foreground">
            Track your kicking performance over time
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-primary/10 border-primary/30">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">
                    Total Sessions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/10 border-secondary/30">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">89%</p>
                  <p className="text-xs text-muted-foreground">Avg Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Sessions
          </h2>

          {sessions.map((session) => (
            <Card key={session.id} className="bg-card/50 border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <CardTitle className="text-base text-foreground">
                        {session.date}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={
                          session.kickType === "field-goal"
                            ? "bg-primary/10 text-primary border-primary/30"
                            : session.kickType === "punt"
                              ? "bg-secondary/10 text-secondary border-secondary/30"
                              : "bg-accent/10 text-accent border-accent/30"
                        }
                      >
                        {session.kickType === "field-goal" && (
                          <Target className="w-3 h-3 mr-1" />
                        )}
                        {session.kickType === "punt" && (
                          <ArrowUp className="w-3 h-3 mr-1" />
                        )}
                        {session.kickType === "kickoff" && (
                          <Zap className="w-3 h-3 mr-1" />
                        )}
                        {session.kickType.charAt(0).toUpperCase() +
                          session.kickType.slice(1).replace("-", " ")}
                      </Badge>
                    </div>
                    <CardDescription>
                      {session.time} • {session.duration}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-secondary/20 text-secondary"
                  >
                    {session.kicks} kicks
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        Peak Speed
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {session.peakSpeed} mph
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Curved Linear ROM
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {session.curvedLinearROM} in
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Ball Speed
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {session.ballSpeed} mph
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Angular ROM
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {session.angularROM}°
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
