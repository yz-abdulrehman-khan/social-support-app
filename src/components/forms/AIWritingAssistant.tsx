import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, RotateCw, Check, X, Edit3, Loader2 } from 'lucide-react';

interface AIWritingAssistantProps {
  fieldName: string;
  currentValue: string;
  onInsert: (text: string) => void;
  onClose: () => void;
}

const fieldPrompts: Record<string, { title: string; examples: string[] }> = {
  financialSituation: {
    title: 'Financial Situation',
    examples: [
      'I lost my job 3 months ago and have been unable to find new employment',
      'I have medical expenses that exceed my monthly income',
      'My spouse passed away and I can no longer afford household expenses',
    ],
  },
  employmentCircumstances: {
    title: 'Employment Circumstances',
    examples: [
      'I was laid off due to company restructuring',
      'I had to leave my job to care for a sick family member',
      'I am unable to work due to a medical condition',
    ],
  },
  reasonForApplying: {
    title: 'Reason for Applying',
    examples: [
      'I need help paying rent and utilities while I search for employment',
      'I need assistance with medical bills and daily expenses',
      'I need support to provide for my children while recovering from illness',
    ],
  },
};

export function AIWritingAssistant({
  fieldName,
  onInsert,
  onClose,
}: AIWritingAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fieldInfo = fieldPrompts[fieldName] || {
    title: 'Description',
    examples: [],
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI generation (replace with actual AI API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock generated text based on prompt
    const mockResponse = `Based on your situation, here is a professional description:\n\n${prompt} This has created significant financial strain on my household. Despite my best efforts to manage expenses and seek alternative solutions, I find myself in need of temporary assistance to meet basic needs and stabilize my financial situation. I am committed to working with any employment or financial counseling programs available and hope to achieve financial independence as soon as circumstances allow. The support would help me cover essential expenses including housing, utilities, and basic necessities for my family during this challenging period.`;

    setGeneratedText(mockResponse);
    setIsGenerating(false);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const handleAccept = () => {
    onInsert(generatedText);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Writing Assistant - {fieldInfo.title}
          </DialogTitle>
          <DialogDescription>
            Describe your situation briefly, and the AI will help you write a clear, professional description. You can then refine, edit, or regenerate the text before inserting it into your application.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Input Section */}
          {!generatedText && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">
                  Tell me briefly what you want to write
                </Label>
                <Textarea
                  id="ai-prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Example: I lost my job and need help with rent..."
                  rows={4}
                  className="resize-none"
                />
                <p className="text-sm text-gray-500">
                  {prompt.length}/500 characters
                </p>
              </div>

              {/* Example Prompts */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Example prompts you can use:</p>
                <div className="space-y-2">
                  {fieldInfo.examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(example)}
                      className="w-full text-left text-sm p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Text
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Generated Text Section */}
          {generatedText && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Generated Text</Label>
                {isEditing ? (
                  <Textarea
                    value={generatedText}
                    onChange={(e) => setGeneratedText(e.target.value)}
                    rows={12}
                    className="resize-none"
                  />
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <p className="whitespace-pre-wrap">{generatedText}</p>
                  </div>
                )}
                <p className="text-sm text-gray-500">
                  {generatedText.length} characters
                </p>
              </div>

              {/* Refinement Options */}
              {!isEditing && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setGeneratedText(generatedText.slice(0, Math.floor(generatedText.length * 0.7)));
                    }}
                  >
                    Make Shorter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setGeneratedText(
                        generatedText + '\n\nAdditionally, I want to emphasize my commitment to improving my situation and appreciate the consideration of my application.'
                      );
                    }}
                  >
                    Add More Detail
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setGeneratedText(
                        generatedText.replace(/I'm/g, 'I am').replace(/can't/g, 'cannot')
                      );
                    }}
                  >
                    More Formal
                  </Button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAccept}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <Check className="w-4 h-4" />
                  Accept & Insert
                </Button>
                <Button
                  onClick={handleRegenerate}
                  variant="outline"
                  className="gap-2"
                  disabled={isGenerating}
                >
                  <RotateCw className="w-4 h-4" />
                  Regenerate
                </Button>
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  {isEditing ? 'Done' : 'Edit'}
                </Button>
                <Button onClick={onClose} variant="outline" className="gap-2">
                  <X className="w-4 h-4" />
                  Discard
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}