import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, RotateCw, Copy, Check, AlertCircle } from 'lucide-react';
import { useIntl } from 'react-intl';
import { AIService } from '@/services/aiService';
import { UI_CONSTANTS } from '@/config/constants';

interface AIWritingAssistantProps {
  open: boolean;
  onClose: () => void;
  onAccept: (text: string) => void;
  language?: 'en' | 'ar';
}

export function AIWritingAssistant({
  open,
  onClose,
  onAccept,
  language = 'en',
}: AIWritingAssistantProps) {
  const intl = useIntl();
  const isRTL = language === 'ar';
  const [userInput, setUserInput] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!userInput.trim()) return;

    setIsGenerating(true);
    setError('');
    try {
      const rephrased = await AIService.rephraseText(userInput, language);
      setGeneratedText(rephrased);
    } catch (error) {
      console.error('Failed to generate text:', error);
      setError('Failed to generate text. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    setGeneratedText(''); // Clear existing text to show skeleton
    await handleGenerate();
  };

  const handleCopy = async () => {
    if (generatedText) {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), UI_CONSTANTS.COPY_FEEDBACK_DURATION_MS);
    }
  };

  const handleAccept = () => {
    if (generatedText) {
      onAccept(generatedText);
      handleClose();
    }
  };

  const handleClose = () => {
    setUserInput('');
    setGeneratedText('');
    setCopied(false);
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        dir={isRTL ? 'rtl' : 'ltr'}
        className="max-w-2xl w-[calc(100%-2rem)] sm:w-full max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className={isRTL ? 'text-right' : ''}>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-theme-accent" />
            <span>{intl.formatMessage({ id: 'aiWritingAssistant.title' })}</span>
          </DialogTitle>
          <DialogDescription>
            {intl.formatMessage({ id: 'aiWritingAssistant.description' })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* User Input Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-dark">
              {intl.formatMessage({ id: 'aiWritingAssistant.userInputLabel' })}
            </label>
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={intl.formatMessage({ id: 'aiWritingAssistant.userInputPlaceholder' })}
              className="min-h-[120px] resize-none"
              dir={isRTL ? 'rtl' : 'ltr'}
              disabled={isGenerating}
            />
            <p className="text-xs text-gray-500">
              {userInput.length} {intl.formatMessage({ id: 'aiWritingAssistant.charactersCount' })}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{intl.formatMessage({ id: 'aiWritingAssistant.errorMessage' })}</p>
            </div>
          )}

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!userInput.trim() || isGenerating}
            className="w-full rounded-full h-11 bg-theme-accent hover:bg-theme-accent-hover text-white font-medium"
          >
            {isGenerating ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>{intl.formatMessage({ id: 'aiWritingAssistant.generating' })}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{intl.formatMessage({ id: 'aiWritingAssistant.generateButton' })}</span>
              </>
            )}
          </Button>

          {/* Loading Skeleton */}
          {isGenerating && !generatedText && (
            <div className="space-y-2 pt-4 border-t">
              <label className="text-sm font-medium text-foreground-dark">
                {intl.formatMessage({ id: 'aiWritingAssistant.generatedTextLabel' })}
              </label>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-theme-accent">
                <RotateCw className="w-3 h-3 animate-spin" />
                <span>{intl.formatMessage({ id: 'aiWritingAssistant.generatingText' })}</span>
              </div>
            </div>
          )}

          {/* Generated Text Section */}
          {generatedText && (
            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground-dark">
                  {intl.formatMessage({ id: 'aiWritingAssistant.generatedTextLabel' })}
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleRegenerate}
                    variant="subtle"
                    size="sm"
                    disabled={isGenerating}
                    className="gap-2"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>{intl.formatMessage({ id: 'aiWritingAssistant.regenerateButton' })}</span>
                  </Button>
                  <Button
                    onClick={handleCopy}
                    variant="subtle"
                    size="sm"
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span>{intl.formatMessage({ id: 'aiWritingAssistant.copiedButton' })}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>{intl.formatMessage({ id: 'aiWritingAssistant.copyButton' })}</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap" dir={isRTL ? 'rtl' : 'ltr'}>
                  {generatedText}
                </p>
              </div>
              <p className="text-xs text-gray-500">
                {generatedText.length} {intl.formatMessage({ id: 'aiWritingAssistant.charactersCount' })}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className={`gap-3 ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
          <Button
            onClick={handleClose}
            variant="subtle"
            className="rounded-full px-6 h-10"
          >
            {intl.formatMessage({ id: 'common.cancel' })}
          </Button>
          <Button
            onClick={handleAccept}
            disabled={!generatedText}
            className="rounded-full px-6 h-10 bg-theme-accent hover:bg-theme-accent-hover text-white"
          >
            {intl.formatMessage({ id: 'aiWritingAssistant.useTextButton' })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
