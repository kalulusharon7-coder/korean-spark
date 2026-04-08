import React, { useState, useCallback, useRef } from 'react';
import { createSpeechRecognition, isSpeechRecognitionSupported } from '@/utils/speech';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Square } from 'lucide-react';

interface SpeechRecorderProps {
  onResult: (text: string) => void;
  disabled?: boolean;
}

const SpeechRecorder: React.FC<SpeechRecorderProps> = ({ onResult, disabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const supported = isSpeechRecognitionSupported();

  const startRecording = useCallback(() => {
    if (!supported) return;
    const recognition = createSpeechRecognition();
    if (!recognition) return;

    recognitionRef.current = recognition;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    setIsRecording(true);
  }, [supported, onResult]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  }, []);

  if (!supported) {
    return (
      <div className="text-center p-3 rounded-lg bg-muted">
        <p className="text-sm text-muted-foreground">
          Speech recognition is not supported in this browser. Try Chrome on desktop.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {isRecording ? (
        <Button
          onClick={stopRecording}
          variant="destructive"
          size="lg"
          className="rounded-full w-16 h-16 animate-pulse-gentle"
          disabled={disabled}
        >
          <Square className="h-6 w-6" />
        </Button>
      ) : (
        <Button
          onClick={startRecording}
          variant="default"
          size="lg"
          className="rounded-full w-16 h-16"
          disabled={disabled}
        >
          <Mic className="h-6 w-6" />
        </Button>
      )}
      <p className="text-xs text-muted-foreground">
        {isRecording ? 'Listening… speak now' : 'Tap to speak'}
      </p>
    </div>
  );
};

export default SpeechRecorder;
