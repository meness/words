import { Alert } from '@nextui-org/alert';
import { Button, ButtonGroup } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Progress } from '@nextui-org/progress';
import { Switch } from '@nextui-org/switch';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, DispatchWithoutAction, SetStateAction, useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { MdDone } from 'react-icons/md';
import { TRAIN_TYPE } from '~common/enums';
import { TrainingWord, Word } from '~common/types';
import { storeTraining } from '~helpers';
import { useTrainings } from '~hooks';

type TrainModalProps = {
  isOpen: boolean;
  onClose: DispatchWithoutAction;
  trainOption: TRAIN_TYPE;
  words: Word[];
  onTrainOptionChange: Dispatch<TRAIN_TYPE>;
};

type NoTrainingContentProps = { onTrainOptionChange: Dispatch<TRAIN_TYPE>; onClose: DispatchWithoutAction };

type TrainContentProps = {
  trainingWords: TrainingWord[];
  trainedWordIndex: number;
  hintAlways: boolean;
  currentTrainingWord: TrainingWord;
  trainedWordHint: boolean;
  setTrainedWordHint: Dispatch<SetStateAction<TrainContentProps['trainedWordHint']>>;
  setTrainedWordIndex: Dispatch<SetStateAction<TrainContentProps['trainedWordIndex']>>;
  handleNextWordClick: DispatchWithoutAction;
  setHintAlways: Dispatch<SetStateAction<TrainContentProps['hintAlways']>>;
};

const NoTrainingContent = ({ onClose, onTrainOptionChange }: NoTrainingContentProps) => (
  <>
    <ModalHeader>تمرین کلمات</ModalHeader>
    <ModalBody>
      <Alert
        color="primary"
        title="هنوز کلمه‌ای تمرین نکردید!"
        classNames={{ base: 'select-none' }}
        description="از یکی از دو حالت دیگه تمرین استفاده کنید. وقتی کلمه‌ای را تمرین کردید می‌توانید از این حالت برای تمرین کلمات تمرین‌شده استفاده کنید."
      />
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        variant="shadow"
        fullWidth
        onPress={() => {
          onTrainOptionChange(TRAIN_TYPE.SCRATCH);
        }}>
        تمرین همه کلمات
      </Button>
      <Button
        color="default"
        variant="ghost"
        fullWidth
        onPress={onClose}>
        بیخیال
      </Button>
    </ModalFooter>
  </>
);

const TrainContent = ({
  currentTrainingWord,
  hintAlways,
  setHintAlways,
  trainedWordIndex,
  trainingWords,
  trainedWordHint,
  handleNextWordClick,
  setTrainedWordHint,
  setTrainedWordIndex
}: TrainContentProps) => {
  const trainingWordsCount = trainingWords.length;
  const isLastWord = trainedWordIndex === trainingWordsCount - 1;

  return (
    <>
      <ModalHeader className="flex items-center gap-3">
        <Progress
          aria-label="وضعیت پیشرفت تمرین"
          className="absolute left-0 right-0 top-0 max-w-full"
          color="success"
          showValueLabel={false}
          size="sm"
          maxValue={trainingWords.length}
          value={trainedWordIndex + 1}
        />
        <Switch
          color="warning"
          defaultSelected={hintAlways}
          onValueChange={(isSelected) => {
            setHintAlways(isSelected);
          }}
          size="sm"
        />
        <p>
          تمرین کلمه {trainedWordIndex + 1} از {trainingWordsCount}
        </p>
      </ModalHeader>
      <ModalBody>
        <div
          className="text-center font-inter text-4xl"
          dir="ltr">
          <p className="font-bold">{currentTrainingWord.word}</p>
          <p className="text-medium">{currentTrainingWord.pronunciation}</p>
        </div>
        <AnimatePresence>
          {(trainedWordHint || hintAlways) && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="my-2"
              transition={{ duration: 0.2 }}>
              <p>
                <span className="select-none text-gray-500">معنی حقوقی:</span>&nbsp;
                {currentTrainingWord.meaning}
              </p>
              <Divider className="my-2" />
              <p>
                <span className="select-none text-gray-500">توضیح:</span>&nbsp;{currentTrainingWord.description}
              </p>
              <Divider className="my-2" />
              <p>
                <span className="select-none text-gray-500">مثال:</span>&nbsp;
                <span
                  dir="ltr"
                  className="font-inter">
                  {currentTrainingWord.example}
                </span>
              </p>
              <Divider className="my-2" />
              <p>
                <span className="select-none text-gray-500">ترجمه:</span>&nbsp;{currentTrainingWord.translation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </ModalBody>
      <ModalFooter className="flex flex-col gap-2 md:flex-row">
        <Button
          color="warning"
          variant="ghost"
          className="order-1 md:order-1"
          isDisabled={trainedWordHint || hintAlways}
          fullWidth
          onPress={() => {
            setTrainedWordHint(true);
          }}>
          راهنمایی بگیر
        </Button>
        <ButtonGroup className="order-2 md:order-1">
          <Button
            color="primary"
            isIconOnly
            variant="shadow"
            isDisabled={trainedWordIndex === 0}
            onPress={() => {
              setTrainedWordIndex((prev) => prev - 1);
              setTrainedWordHint(false);
            }}>
            <FaChevronRight />
          </Button>
          <Button
            color="primary"
            variant="shadow"
            fullWidth
            endContent={isLastWord ? <MdDone /> : <FaChevronLeft />}
            isDisabled={isLastWord}
            onPress={handleNextWordClick}>
            {isLastWord ? 'آخرین کلمه' : 'برو کلمه بعدی'}
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </>
  );
};

export const TrainModal = ({ isOpen, onClose, trainOption, words, onTrainOptionChange }: TrainModalProps) => {
  const [trainedWordIndex, setTrainedWordIndex] = useState(0);
  const [trainedWordHint, setTrainedWordHint] = useState(false);
  const [hintAlways, setHintAlways] = useState(false);
  const trainings = useTrainings();

  const trainingWords = useMemo<TrainingWord[]>(() => {
    const data = words.map<TrainingWord>((word) => {
      const isTrained = trainings.findIndex((training) => training.id === word.id) !== -1;

      return { ...word, trained: isTrained };
    });

    if (trainOption === TRAIN_TYPE.TRAINED) {
      return data.filter((word) => word.trained);
    } else if (trainOption === TRAIN_TYPE.REST) {
      return data.filter((word) => !word.trained);
    }

    return data;
  }, [words, trainings, trainOption]);

  const reset = () => {
    setTrainedWordIndex(0);
    setTrainedWordHint(false);
    setHintAlways(false);
  };

  const handleNextWordClick = async () => {
    if (!trainingWords[trainedWordIndex].trained) {
      await storeTraining(trainingWords[trainedWordIndex]);
    }

    setTrainedWordIndex((prev) => prev + 1);
    setTrainedWordHint(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      backdrop="blur"
      placement="bottom-center"
      isOpen={isOpen}
      classNames={{ header: 'select-none' }}
      size="md"
      onClose={handleClose}>
      <ModalContent>
        {() => {
          const currentTrainingWord: TrainingWord | undefined = trainingWords[trainedWordIndex];

          if (!currentTrainingWord) {
            return (
              <NoTrainingContent
                onClose={handleClose}
                onTrainOptionChange={onTrainOptionChange}
              />
            );
          }

          return (
            <TrainContent
              trainingWords={trainingWords}
              trainedWordIndex={trainedWordIndex}
              hintAlways={hintAlways}
              currentTrainingWord={currentTrainingWord}
              trainedWordHint={trainedWordHint}
              setTrainedWordHint={setTrainedWordHint}
              setTrainedWordIndex={setTrainedWordIndex}
              handleNextWordClick={handleNextWordClick}
              setHintAlways={setHintAlways}
            />
          );
        }}
      </ModalContent>
    </Modal>
  );
};
