import { Alert } from '@nextui-org/alert';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Progress } from '@nextui-org/progress';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { Dispatch, DispatchWithoutAction, SetStateAction, useEffect, useMemo, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import { MdDone } from 'react-icons/md';
import { EXAM_TYPE } from '~common/enums';
import { Exam, TrainingWord, Word } from '~common/types';
import { deleteTrainingEntity, storeExamEntity } from '~helpers';
import { useTrainingsQuery } from '~hooks';
import { formatDecimal, getRandomIndexes, shuffleArray } from '~utils';
import { Stat } from './stat.component';

type ExamModalProps = {
  isOpen: boolean;
  onClose: DispatchWithoutAction;
  words: Word[];
  examType: EXAM_TYPE;
};

type CompletedExamContentProps = {
  trainingWordsCount: number;
  rightAnswersCount: number;
  handleClose: DispatchWithoutAction;
  examsWithWrongAnswer: Exam[];
  handleTrainWrongAnswers: DispatchWithoutAction;
};

type NoTrainingContentProps = { onClose: DispatchWithoutAction };

type ExamContentProps = {
  trainingWords: TrainingWord[];
  trainedWordIndex: number;
  currentTrainingWord: TrainingWord;
  chosenAnswer: string | null;
  setChosenAnswer: Dispatch<SetStateAction<ExamContentProps['chosenAnswer']>>;
  randomAnswers: Word[];
  handleNextExamClick: Dispatch<boolean>;
  examType: EXAM_TYPE;
  exams: Exam[];
};

const CompletedExamContent = ({
  trainingWordsCount,
  rightAnswersCount,
  handleClose,
  examsWithWrongAnswer,
  handleTrainWrongAnswers
}: CompletedExamContentProps) => (
  <>
    <ModalHeader>پایان آزمون</ModalHeader>
    <ModalBody className="place-items-center">
      <Stat
        value={(rightAnswersCount * 100) / trainingWordsCount}
        isLoading={false}>
        {rightAnswersCount === trainingWordsCount
          ? 'همه را درست جواب دادید'
          : `${formatDecimal(rightAnswersCount)} جواب درست دادید`}
      </Stat>
    </ModalBody>
    <ModalFooter className="flex flex-col gap-2 md:flex-row">
      <Button
        color="default"
        variant="ghost"
        fullWidth
        onPress={handleClose}>
        بعدا ادامه می‌دهم
      </Button>
      <Button
        color="primary"
        variant="shadow"
        fullWidth
        isDisabled={!examsWithWrongAnswer.length}
        onPress={handleTrainWrongAnswers}>
        تمرین مجدد اشتباهات
      </Button>
    </ModalFooter>
  </>
);

const NoTrainingContent = ({ onClose }: NoTrainingContentProps) => (
  <>
    <ModalHeader>پیشرفت خود را بسنجید</ModalHeader>
    <ModalBody>
      <Alert
        color="primary"
        title="هنوز کلمه‌ای تمرین نکردید!"
        classNames={{ base: 'select-none' }}
        description="ابتدا چند کلمه‌ای تمرین کنید سپس پیشرفت خود را با این ابزار بسنجید."
      />
    </ModalBody>
    <ModalFooter>
      <Button
        color="default"
        variant="shadow"
        fullWidth
        onPress={onClose}>
        بعدا آزمون می‌دهم
      </Button>
    </ModalFooter>
  </>
);

const ExamContent = ({
  trainingWords,
  trainedWordIndex,
  currentTrainingWord,
  chosenAnswer,
  setChosenAnswer,
  randomAnswers,
  handleNextExamClick,
  examType,
  exams
}: ExamContentProps) => {
  const trainingWordsCount = trainingWords.length;
  const isLastExam = exams.length + 1 === trainingWords.length;

  return (
    <>
      <ModalHeader className="flex items-center gap-3">
        <Progress
          aria-label="وضعیت پیشرفت آزمون"
          className="absolute left-0 right-0 top-0 max-w-full"
          color="success"
          showValueLabel={false}
          size="sm"
          maxValue={trainingWords.length}
          value={trainedWordIndex + 1}
        />
        سوال {formatDecimal(trainedWordIndex + 1)} از {formatDecimal(trainingWordsCount)}
      </ModalHeader>
      <ModalBody>
        <div
          className="text-center font-inter text-4xl"
          dir="ltr">
          <p className="font-bold">{currentTrainingWord.word}</p>
          <p className="text-medium">{currentTrainingWord.pronunciation}</p>
        </div>
        <div className="my-2">
          <RadioGroup
            label={examType === EXAM_TYPE.MEANING ? 'معنی کلمه بالا کدام است؟' : 'توضیح کلمه بالا کدام است؟'}
            value={chosenAnswer}
            onValueChange={setChosenAnswer}>
            {randomAnswers.map((randomAnswer) => (
              <Radio
                key={randomAnswer.id}
                value={String(randomAnswer.id)}>
                {examType === EXAM_TYPE.MEANING ? randomAnswer.meaning : randomAnswer.description}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </ModalBody>
      <ModalFooter className="flex flex-col gap-2 md:flex-row">
        <Button
          color="danger"
          variant="flat"
          onPress={() => {
            handleNextExamClick(false);
          }}>
          نمی‌دانم
        </Button>
        <Button
          color="primary"
          variant="shadow"
          fullWidth
          endContent={isLastExam ? <MdDone /> : <FaChevronLeft />}
          isDisabled={!chosenAnswer}
          onPress={() => {
            handleNextExamClick(true);
          }}>
          {isLastExam ? 'ثبت جواب و پایان آزمون' : 'سوال بعدی'}
        </Button>
      </ModalFooter>
    </>
  );
};

export const ExamModal = ({ isOpen, onClose, words, examType }: ExamModalProps) => {
  const [trainedWordIndex, setTrainedWordIndex] = useState(0);
  const [exams, setExams] = useState<Exam[]>([]);
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const trainings = useTrainingsQuery();

  const trainingWords = useMemo<TrainingWord[]>(() => {
    const data = words.flatMap<TrainingWord>((word) => {
      const isTrained = trainings.findIndex((training) => training.id === word.id) !== -1;

      if (!isTrained) {
        return [];
      }

      return { ...word, trained: isTrained };
    });

    return shuffleArray(data);
  }, [
    words,
    trainings,
    isOpen
  ]);

  const handleClose = () => {
    setTrainedWordIndex(0);
    setExams([]);
    setChosenAnswer(null);
    setIsExamCompleted(false);
    onClose();
  };

  const saveCurrentExam = (answered: boolean) => {
    const currentWord = trainingWords[trainedWordIndex];

    setExams((prev) => [
      ...prev,
      {
        question: currentWord,
        answer: answered ? words.find((word) => word.id === Number(chosenAnswer)) : undefined
      }
    ]);
  };

  useEffect(() => {
    const store = async () => {
      if (isExamCompleted) {
        await storeExamEntity(exams);
      }
    };

    store();
  }, [isExamCompleted]);

  const handleNextExamClick = async (answered: boolean) => {
    saveCurrentExam(answered);

    if (trainedWordIndex !== trainingWords.length - 1) {
      setTrainedWordIndex((prev) => prev + 1);
    } else {
      setIsExamCompleted(true);
    }
  };

  const randomAnswers = useMemo(() => {
    if (!words.length) {
      return [];
    }

    let data = getRandomIndexes(0, words.length - 1, trainedWordIndex, 3).map((index) => words[index]);
    data.push(trainingWords[trainedWordIndex]);
    data = shuffleArray(data);

    return data;
  }, [trainedWordIndex, words, isOpen]);

  const handleTrainWrongAnswers = async () => {
    const examsWithWrongAnswer = exams.filter((exam) => exam.question.id !== exam.answer?.id);

    await Promise.all(examsWithWrongAnswer.map((exam) => deleteTrainingEntity(exam.question.id)));

    handleClose();
  };

  return (
    <Modal
      backdrop="blur"
      placement="bottom-center"
      isOpen={isOpen}
      classNames={{ base: 'select-none' }}
      size="md"
      onClose={handleClose}>
      <ModalContent>
        {() => {
          const trainingWordsCount = trainingWords.length;

          if (isExamCompleted) {
            const examsWithWrongAnswer = exams.filter((exam) => exam.question.id !== exam.answer?.id);
            const rightAnswersCount = trainingWords.length - examsWithWrongAnswer.length;

            return (
              <CompletedExamContent
                trainingWordsCount={trainingWordsCount}
                rightAnswersCount={rightAnswersCount}
                handleClose={handleClose}
                examsWithWrongAnswer={examsWithWrongAnswer}
                handleTrainWrongAnswers={handleTrainWrongAnswers}
              />
            );
          }

          const currentTrainingWord: TrainingWord | undefined = trainingWords[trainedWordIndex];

          if (!currentTrainingWord) {
            return <NoTrainingContent onClose={handleClose} />;
          }

          return (
            <ExamContent
              trainingWords={trainingWords}
              trainedWordIndex={trainedWordIndex}
              currentTrainingWord={currentTrainingWord}
              chosenAnswer={chosenAnswer}
              setChosenAnswer={setChosenAnswer}
              randomAnswers={randomAnswers}
              handleNextExamClick={handleNextExamClick}
              examType={examType}
              exams={exams}
            />
          );
        }}
      </ModalContent>
    </Modal>
  );
};
