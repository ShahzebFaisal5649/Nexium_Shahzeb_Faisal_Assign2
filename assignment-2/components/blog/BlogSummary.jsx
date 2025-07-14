import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Globe2, Languages } from "lucide-react";

export default function BlogSummary({ data }) {
  if (!data) return null;

  const { title, summary, urduSummary, url, wordCount, extractedAt } = data;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-6">
      {/* Blog Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Globe2 className="h-4 w-4" />
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {new URL(url).hostname}
              </a>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {wordCount} words
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {new Date(extractedAt).toLocaleString()}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* English Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="secondary">English</Badge>
            Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </CardContent>
      </Card>

      {/* Urdu Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">
              <Languages className="h-3 w-3 mr-1" />
              اردو
            </Badge>
            خلاصہ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed text-right" dir="rtl">
            {urduSummary}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
