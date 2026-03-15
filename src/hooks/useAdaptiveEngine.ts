import { useAdaptiveStore } from '@/store/adaptiveStore';
import { mockQuestions } from '@/lib/mockQuestions';
// removed unused Question import

// Simple item selection algorithm
export function useAdaptiveEngine() {
  const { theta, nextQuestion, history } = useAdaptiveStore();

  const getNextQuestion = () => {
    // Determine target difficulty based on theta
    // Theta 130 -> diff 1, Theta 170 -> diff 5
    const targetDiff = Math.max(1, Math.min(5, Math.round((theta - 130) / 10) + 1));
    
    // Find unasked question closest to target difficulty
    const unasked = mockQuestions.filter(
      q => !history.some(h => h.question.id === q.id)
    );
    
    if (unasked.length === 0) return null;

    // Sort by proximity to targetDiff
    unasked.sort((a, b) => Math.abs(a.difficulty - targetDiff) - Math.abs(b.difficulty - targetDiff));
    
    // Pick the best match
    const nextQ = unasked[0];
    nextQuestion(nextQ);
    return nextQ;
  };

  return { getNextQuestion };
}
