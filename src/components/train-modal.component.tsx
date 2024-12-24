import { Button, ButtonGroup } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Progress } from '@nextui-org/progress';
import { Switch } from '@nextui-org/switch';
import { AnimatePresence, motion } from 'framer-motion';
import { DispatchWithoutAction, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { TRAIN } from '~common/enums';
import { WordEntity } from '~entities';
import { storeWord } from '~helpers';

type TrainModalProps = {
  isOpen: boolean;
  onClose: DispatchWithoutAction;
  onNextWord: DispatchWithoutAction;
  selectedTrainOption: [TRAIN];
  words: WordEntity;
};

export const TrainModal = ({ isOpen, onClose, selectedTrainOption, words, onNextWord }: TrainModalProps) => {
  const [trainedWordIndex, setTrainedWordIndex] = useState(0);
  const [trainedWordHint, setTrainedWordHint] = useState(false);
  const [hintAlways, setHintAlways] = useState(false);
  return (
    <Modal
      backdrop="blur"
      placement="bottom-center"
      isOpen={isOpen}
      classNames={{ header: 'select-none' }}
      size="md"
      onClose={() => {
        setTrainedWordIndex(0);
        setTrainedWordHint(false);
        setHintAlways(false);
        onClose();
      }}>
      <ModalContent>
        {() => {
          let wordsData: WordEntity = [];
          if (selectedTrainOption[0] === TRAIN.SCRATCH) {
            wordsData = words;
          } else if (selectedTrainOption[0] === TRAIN.LEARNED) {
            wordsData = words.filter((row) => row.exists);
          } else if (selectedTrainOption[0] === TRAIN.LEFT) {
            wordsData = words.filter((row) => !row.exists);
          }

          const wordsCount = wordsData.length;
          const currentWord = wordsData[trainedWordIndex];

          return (
            <>
              <ModalHeader className="flex items-center gap-3">
                <Progress
                  aria-label="Training..."
                  className="absolute left-0 right-0 top-0 max-w-full"
                  color="success"
                  showValueLabel={false}
                  size="sm"
                  maxValue={wordsData.length}
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
                  تمرین کلمه {trainedWordIndex + 1} از {wordsCount}
                </p>
              </ModalHeader>
              <ModalBody>
                <div
                  className="text-center font-inter text-4xl"
                  dir="ltr">
                  <p className="font-bold">{currentWord?.word}</p>
                  <p className="text-medium">{currentWord?.pronunciation}</p>
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
                        <span className="select-none text-gray-500">معنی حقوقی:</span>&nbsp;{currentWord?.translation}
                      </p>
                      <Divider className="my-2" />
                      <p>
                        <span className="select-none text-gray-500">توضیح:</span>&nbsp;{currentWord?.description}
                      </p>
                      <Divider className="my-2" />
                      <p>
                        <span className="select-none text-gray-500">مثال:</span>&nbsp;
                        <span
                          dir="ltr"
                          className="font-inter">
                          {currentWord?.example}
                        </span>
                      </p>
                      <Divider className="my-2" />
                      <p>
                        <span className="select-none text-gray-500">ترجمه:</span>&nbsp;{currentWord?.translation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ModalBody>
              <ModalFooter className="flex flex-col gap-4 md:flex-row">
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
                    endContent={<FaChevronRight />}
                    isDisabled={trainedWordIndex === 0}
                    onPress={() => {
                      setTrainedWordIndex((prev) => prev - 1);
                      setTrainedWordHint(false);
                    }}
                  />
                  <Button
                    color="primary"
                    variant="shadow"
                    fullWidth
                    endContent={<FaChevronLeft />}
                    isDisabled={trainedWordIndex + 1 === wordsCount}
                    onPress={async () => {
                      if (currentWord && selectedTrainOption[0] !== TRAIN.LEARNED) {
                        await storeWord(currentWord);
                      }

                      setTrainedWordIndex((prev) => prev + 1);
                      setTrainedWordHint(false);
                      onNextWord();
                    }}>
                    برو کلمه بعدی
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};
