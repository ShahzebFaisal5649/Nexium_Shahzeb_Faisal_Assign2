import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, FileText } from "lucide-react";

export default function BlogHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch("/api/blog-summary");
      const data = await response.json();

      if (data.success) {
        setHistory(data.data);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No blog summaries yet. Start by summarising your first blog!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Blog History</h2>

      {history.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="truncate">{item.title}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(item.url, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {new Date(item.created_at).toLocaleDateString()}
              </div>
              <Badge variant="secondary">{item.word_count} words</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-1">Summary:</h4>
                <p className="text-gray-700 text-sm">{item.summary}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">اردو خلاصہ:</h4>
                <p className="text-gray-700 text-sm text-right" dir="rtl">
                  {item.urdu_summary}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
