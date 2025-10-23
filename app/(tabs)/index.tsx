import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Question = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
};

type ViewState = 'quiz' | 'result' | 'review';

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    prompt: 'Which language is used with Jetpack Compose for Android UI development?',
    options: ['Kotlin', 'Swift', 'JavaScript', 'C#'],
    answerIndex: 0,
  },
  {
    id: 'q2',
    prompt: 'What does the acronym API stand for?',
    options: ['Advanced Program Index', 'Application Programming Interface', 'Application Protocol Integration', 'Automated Processing Interface'],
    answerIndex: 1,
  },
  {
    id: 'q3',
    prompt: 'Which company created the React JavaScript library?',
    options: ['Google', 'Apple', 'Meta', 'Microsoft'],
    answerIndex: 2,
  },
  {
    id: 'q4',
    prompt: 'What database is known for using structured query language?',
    options: ['MongoDB', 'PostgreSQL', 'Redis', 'Cassandra'],
    answerIndex: 1,
  },
  {
    id: 'q5',
    prompt: 'Which CSS framework provides utility-first styling classes?',
    options: ['Bootstrap', 'Tailwind CSS', 'Foundation', 'Bulma'],
    answerIndex: 1,
  },
  {
    id: 'q6',
    prompt: 'What is the primary purpose of Git?',
    options: ['Design graphics', 'Manage source code versions', 'Compile code', 'Deploy applications'],
    answerIndex: 1,
  },
  {
    id: 'q7',
    prompt: 'Which protocol secures communication on the web?',
    options: ['HTTP', 'FTP', 'SSH', 'HTTPS'],
    answerIndex: 3,
  },
  {
    id: 'q8',
    prompt: 'What JavaScript feature allows functions to be passed as arguments?',
    options: ['Closures', 'Promises', 'First-class functions', 'Prototypes'],
    answerIndex: 2,
  },
  {
    id: 'q9',
    prompt: 'Which mobile framework uses Dart as its programming language?',
    options: ['React Native', 'Flutter', 'NativeScript', 'Ionic'],
    answerIndex: 1,
  },
  {
    id: 'q10',
    prompt: 'What does CI in CI/CD pipelines represent?',
    options: ['Continuous Integration', 'Code Inspection', 'Centralized Infrastructure', 'Continuous Interaction'],
    answerIndex: 0,
  },
];

const QUESTION_DURATION = 20;

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const [view, setView] = useState<ViewState>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [timedOut, setTimedOut] = useState<boolean[]>(Array(QUESTIONS.length).fill(false));
  const [timeLeft, setTimeLeft] = useState(QUESTION_DURATION);

  const currentQuestion = QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;
  const hasTimedOut = timedOut[currentIndex];

  useEffect(() => {
    if (view !== 'quiz') return;
    if (hasTimedOut) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, [view, currentIndex, hasTimedOut]);

  useEffect(() => {
    if (view !== 'quiz') return;
    const nextTime = timedOut[currentIndex] ? 0 : QUESTION_DURATION;
    setTimeLeft(nextTime);
  }, [currentIndex, timedOut, view]);

  useEffect(() => {
    if (view !== 'quiz') return;
    if (timedOut[currentIndex]) return;
    if (timeLeft === 0) {
      handleTimeExpiration();
    }
  }, [timeLeft, view, currentIndex, timedOut]);

  const score = useMemo(
    () => answers.filter((answer, index) => answer === QUESTIONS[index].answerIndex).length,
    [answers]
  );

  const unanswered = useMemo(
    () => answers.filter(answer => answer === null).length,
    [answers]
  );

  const incorrect = useMemo(
    () => answers.filter((answer, index) => answer !== null && answer !== QUESTIONS[index].answerIndex).length,
    [answers]
  );

  const progressPercentage = Math.max(0, (timeLeft / QUESTION_DURATION) * 100);

  const handleSelect = (optionIndex: number) => {
    if (view !== 'quiz') return;
    if (hasTimedOut) return;
    setAnswers(prev => {
      const updated = [...prev];
      updated[currentIndex] = optionIndex;
      return updated;
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setView('result');
      return;
    }
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(prev => prev - 1);
  };

  const handleTimeExpiration = () => {
    setTimedOut(prev => {
      const updated = [...prev];
      updated[currentIndex] = true;
      return updated;
    });
    if (isLastQuestion) {
      setView('result');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setTimedOut(Array(QUESTIONS.length).fill(false));
    setCurrentIndex(0);
    setTimeLeft(QUESTION_DURATION);
    setView('quiz');
  };

  if (view === 'result') {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]}>
        <View style={styles.resultContainer}>
          <ThemedText type="title" style={[styles.centerText, { color: palette.tint }]}>Quiz Complete</ThemedText>
          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: '#f0e6ff',
                borderColor: palette.tint,
              },
            ]}
          >
            <ThemedText type="subtitle" style={[{ color: palette.icon }]}>Score</ThemedText>
            <ThemedText type="title" style={[{ color: palette.tint }]}>{`${score}/${QUESTIONS.length}`}</ThemedText>
            <View style={styles.summaryRow}>
              <ThemedText style={[styles.summaryLabel, { color: '#2b1f16' }]}>Correct</ThemedText>
              <ThemedText style={[styles.summaryValue, { color: palette.tint }]}>{score}</ThemedText>
            </View>
            <View style={styles.summaryRow}>
              <ThemedText style={[styles.summaryLabel, { color: '#2b1f16' }]}>Incorrect</ThemedText>
              <ThemedText style={[styles.summaryValue, { color: '#d14c4c' }]}>{incorrect}</ThemedText>
            </View>
            <View style={styles.summaryRow}>
              <ThemedText style={[styles.summaryLabel, { color: '#2b1f16' }]}>Unanswered</ThemedText>
              <ThemedText style={[styles.summaryValue, { color: '#8a7054' }]}>{unanswered}</ThemedText>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setView('review')}
            style={[styles.actionButton, { backgroundColor: palette.tint }]}
          >
            <ThemedText style={[styles.actionText, { color: palette.background }]}>Review Answers</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRestart}
            style={[styles.actionButton, { borderWidth: 1, borderColor: palette.tint }]}
          >
            <ThemedText style={[styles.actionText, { color: palette.tint }]}>Retake Quiz</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (view === 'review') {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]}>
        <ScrollView contentContainerStyle={[styles.reviewContainer, { backgroundColor: palette.background }]}
        >
          <ThemedText type="title" style={[styles.reviewHeading, { color: palette.tint }]}>Answer Review</ThemedText>
          <ThemedText style={[styles.reviewSubtitle, { color: palette.icon }]}>{`Final score ${score}/${QUESTIONS.length}`}</ThemedText>
          {QUESTIONS.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.answerIndex;
            const isUnanswered = userAnswer === null;
            const statusColor = isCorrect ? palette.tint : isUnanswered ? '#8a7054' : '#d14c4c';
            const backgroundColor = isCorrect
              ? '#ede6ff'
              : isUnanswered
              ? '#f2e7d8'
              : '#fdeaea';
            const borderColor = isCorrect ? palette.tint : isUnanswered ? '#d9c8b3' : '#f29b9b';
            const answerText = isUnanswered ? 'Unanswered' : question.options[userAnswer!];
            return (
              <View
                key={question.id}
                style={[styles.reviewCard, { backgroundColor, borderColor }]}
              >
                <ThemedText style={[styles.reviewQuestion, { color: palette.text }]}>{`${index + 1}. ${question.prompt}`}</ThemedText>
                <View style={styles.reviewBlock}>
                  <ThemedText style={[styles.reviewLabel, { color: statusColor }]}>Your answer</ThemedText>
                  <ThemedText style={[styles.reviewAnswer, { color: statusColor }]}>{answerText}</ThemedText>
                </View>
                <View style={styles.reviewBlock}>
                  <ThemedText style={[styles.reviewLabel, { color: palette.text }]}>Correct answer</ThemedText>
                  <ThemedText style={[styles.reviewAnswer, { color: palette.text }]}>{question.options[question.answerIndex]}</ThemedText>
                </View>
              </View>
            );
          })}
          <View style={styles.reviewActions}>
            <TouchableOpacity
              onPress={() => setView('result')}
              style={[styles.actionButton, { backgroundColor: palette.tint }]}
            >
              <ThemedText style={[styles.actionText, { color: palette.background }]}>Back to Score</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleRestart}
              style={[styles.actionButton, { borderWidth: 1, borderColor: palette.tint }]}
            >
              <ThemedText style={[styles.actionText, { color: palette.tint }]}>Retake Quiz</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]}>
      <View style={[styles.container, { backgroundColor: palette.background }]}
      >
        <View style={styles.header}>
          <View>
            <ThemedText style={[styles.progressLabel, { color: palette.icon }]}>{`Question ${currentIndex + 1} of ${QUESTIONS.length}`}</ThemedText>
            <ThemedText type="title" style={[styles.questionCounter, { color: palette.tint }]}>Tech Trivia</ThemedText>
          </View>
          <View style={styles.timerWrapper}>
            <ThemedText style={[styles.timerLabel, { color: palette.icon }]}>Time left</ThemedText>
            <ThemedText style={[styles.timerValue, { color: hasTimedOut ? '#ef4444' : palette.tint }]}>{`${timeLeft}s`}</ThemedText>
            <View style={[styles.timerTrack, { backgroundColor: '#e8dcca' }]}>
              <View
                style={[
                  styles.timerFill,
                  {
                    width: `${progressPercentage}%`,
                    backgroundColor: hasTimedOut ? '#ef4444' : palette.tint,
                  },
                ]}
              />
            </View>
          </View>
        </View>
        <View
          style={[
            styles.questionCard,
            {
              backgroundColor: '#fff7ed',
              borderColor: '#e4cdb2',
            },
          ]}
        >
          <ThemedText style={[styles.questionText, { color: '#2b1f16' }]}>{currentQuestion.prompt}</ThemedText>
          <View style={styles.optionsWrapper}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentIndex] === index;
              const isDisabled = hasTimedOut;
              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleSelect(index)}
                  disabled={isDisabled}
                  style={[
                    styles.optionButton,
                    {
                      borderColor: isSelected ? palette.tint : '#d9c8b3',
                      backgroundColor: isSelected ? palette.tint : '#fceddb',
                    },
                    isDisabled && styles.optionDisabled,
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.optionText,
                      {
                        color: isSelected ? '#ffffff' : '#2b1f16',
                      },
                      isDisabled && { color: '#8a7054' },
                    ]}
                  >
                    {option}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.navigation}>
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentIndex === 0}
            style={[
              styles.navButton,
              {
                borderColor: palette.tint,
                backgroundColor: currentIndex === 0 ? '#f2e4cc' : '#fceddb',
              },
              currentIndex === 0 && styles.navButtonDisabled,
            ]}
          >
            <ThemedText style={[styles.navButtonText, { color: palette.tint }]}>Previous</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNext}
            style={[styles.navButton, { backgroundColor: palette.tint, borderColor: palette.tint }]}
          >
            <ThemedText style={[styles.navButtonText, { color: '#ffffff' }]}>{
              isLastQuestion ? 'Finish' : 'Next'
            }</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontFamily: Fonts.medium,
    fontSize: 16,
  },
  questionCounter: {
    marginTop: 4,
  },
  timerWrapper: {
    width: 120,
  },
  timerLabel: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    textAlign: 'right',
  },
  timerValue: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    textAlign: 'right',
    marginTop: 4,
  },
  timerTrack: {
    height: 8,
    borderRadius: 999,
    marginTop: 8,
    overflow: 'hidden',
  },
  timerFill: {
    height: '100%',
    borderRadius: 999,
  },
  questionCard: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    gap: 24,
  },
  questionText: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    lineHeight: 28,
  },
  optionsWrapper: {
    gap: 16,
  },
  optionButton: {
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  optionText: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
  },
  optionDisabled: {
    opacity: 0.6,
  },
  navigation: {
    flexDirection: 'row',
    gap: 16,
  },
  navButton: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  navButtonDisabled: {
    opacity: 0.6,
  },
  navButtonText: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 24,
  },
  centerText: {
    textAlign: 'center',
  },
  summaryCard: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontFamily: Fonts.medium,
    fontSize: 16,
  },
  summaryValue: {
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
  actionButton: {
    width: '100%',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
  },
  reviewContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 20,
  },
  reviewHeading: {
    textAlign: 'center',
  },
  reviewSubtitle: {
    textAlign: 'center',
    fontFamily: Fonts.medium,
    fontSize: 16,
  },
  reviewCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 12,
  },
  reviewQuestion: {
    fontFamily: Fonts.semibold,
    fontSize: 18,
    lineHeight: 26,
  },
  reviewBlock: {
    gap: 4,
  },
  reviewLabel: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  reviewAnswer: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
  },
  reviewActions: {
    gap: 16,
  },
});
