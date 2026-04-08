import React from 'react';
import { basicConsonants, basicVowels, HangulChar } from '@/data/hangul';
import { speakKorean } from '@/utils/speech';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';

interface HangulChartProps {
  showNames?: boolean;
}

const CharCard: React.FC<{ char: HangulChar; showName: boolean }> = ({ char, showName }) => {
  const handlePlay = () => {
    speakKorean(char.character, 0.7);
  };

  return (
    <button
      onClick={handlePlay}
      className="flex flex-col items-center p-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors group"
    >
      <span className="korean-text text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
        {char.character}
      </span>
      <span className="text-xs text-muted-foreground mt-1">{char.romanization}</span>
      {showName && (
        <span className="text-[10px] text-muted-foreground mt-0.5">{char.sound}</span>
      )}
    </button>
  );
};

const HangulChart: React.FC<HangulChartProps> = ({ showNames = false }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Consonants (자음)</h3>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-7">
          {basicConsonants.map(c => (
            <CharCard key={c.character} char={c} showName={showNames} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Vowels (모음)</h3>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-5">
          {basicVowels.map(v => (
            <CharCard key={v.character} char={v} showName={showNames} />
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Tap any character to hear its sound 🔊
      </p>
    </div>
  );
};

export default HangulChart;
