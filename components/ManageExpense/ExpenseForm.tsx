import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
import { GlobalStyles } from '../../constans/styles';
import useForm from '../../hooks/useForm';
import { ConfirmHandlerParams } from '../../screens/ManageExpense';
import PressableButton from '../UI/PressableButton';
import InputField from './InputField';
import DatePicker from 'react-native-modern-datepicker';
import { Keyboard } from 'react-native';
import { Expense } from '../../types/app';
import dayjs from 'dayjs';

interface ExpenseFormProps {
  title?: string;
  isEditing: boolean;
  onCancel: () => void;
  onClearForm?: boolean;
  onSubmit: (props: ConfirmHandlerParams) => void;
  defaultValues?: Partial<Expense>;
}

const ExpenseForm = ({
  title,
  onClearForm,
  onCancel,
  isEditing,
  onSubmit,
  defaultValues,
}: ExpenseFormProps) => {
  const {
    amount,
    date,
    title: titleValue,
    resetForm,
    form,
    setForm,
  } = useForm({
    amount: {
      value: '',
      isValid: true,
    },
    date: {
      value: '',
      isValid: true,
    },
    title: {
      value: '',
      isValid: true,
    },
  });
  const [openCalender, setOpenCalender] = useState(false);
  const [isError, setIsError] = useState(
    Object.values(form).some((field) => !field.isValid)
  );

  const Title = () =>
    title ? <Text style={styles.title}>{title}</Text> : null;

  const inputValueHandler = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: {
        value: key === 'date' ? dayjs(value).format('DD-MM-YYYY') : value,
        isValid: true,
      },
    }));
  };

  const submitHandler = () => {
    const splitDate = date.value.split('-');
    const getMonth = splitDate[1];
    const getYear = splitDate[2];
    const getDay = splitDate[0];
    const fullDate = `${getYear}-${getMonth}-${getDay}`;

    const expense = {
      amount: +amount.value,
      date: new Date(fullDate),
      title: titleValue.value,
    };

    const isAmountValid = +amount.value > 0;
    const isDateValid = dayjs(fullDate).isValid();
    const isTitleValid = titleValue.value.trim().length > 0;

    if (isAmountValid && isDateValid && isTitleValid)
      return onSubmit({
        isEditing,
        expense,
      });

    setForm((prev) => ({
      ...prev,
      amount: {
        ...prev.amount,
        isValid: isAmountValid,
      },
      date: {
        ...prev.date,
        isValid: isDateValid,
      },
      title: {
        ...prev.title,
        isValid: isTitleValid,
      },
    }));
  };

  const calendarHandler = () => {
    setOpenCalender((prev) => !prev);
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (defaultValues) {
      setForm({
        amount: {
          value: defaultValues?.amount?.toString() || '',
          isValid: true,
        },
        date: {
          value: defaultValues?.date
            ? dayjs(defaultValues?.date).format('DD/MM/YYYY')
            : '',
          isValid: true,
        },
        title: {
          value: defaultValues?.title || '',
          isValid: true,
        },
      });
    }
  }, [defaultValues]);

  useEffect(() => {
    if (date.value && openCalender) calendarHandler();
  }, [date.value]);

  useEffect(() => {
    if (onClearForm) resetForm();
  }, [onClearForm]);
  return (
    <>
      <Pressable
        style={[
          styles.datePickerContainer,
          { display: openCalender ? 'flex' : 'none' },
        ]}
        onPress={calendarHandler}
      >
        <Pressable>
          <View style={{ marginHorizontal: 24 }}>
            <DatePicker
              options={GlobalStyles.colors.calendar}
              style={{
                ...styles.datePicker,
              }}
              mode="calendar"
              onDateChange={inputValueHandler.bind(this, 'date')}
            />
          </View>
        </Pressable>
      </Pressable>
      <View style={styles.container}>
        <Title />
        <View style={styles.nextEachOther}>
          <InputField
            label="Amount"
            placeholder="$0.00"
            keyboardType="decimal-pad"
            extendContainerStyle={{ flex: 1, marginRight: 4 }}
            value={form.amount.value}
            onChangeText={inputValueHandler.bind(this, 'amount')}
            invalid={!form.amount.isValid}
          />
          <Pressable onPress={calendarHandler} style={styles.calendarInput}>
            <InputField
              label="Date"
              placeholder="DD-MM-YYYY"
              maxLength={10}
              value={date.value}
              editable={false}
              extendTextStyle={date ? styles.calendarTextColor : {}}
              invalid={!form.date.isValid}
            />
          </Pressable>
        </View>
        <InputField
          label="Title"
          autoCapitalize="sentences"
          placeholder="Hmmm... Do I spend money on this?"
          value={form.title.value}
          onChangeText={inputValueHandler.bind(this, 'title')}
          extendContainerStyle={styles.lastInputField}
          invalid={!form.title.isValid}
        />

        {isError && (
          <Text style={styles.errorText}>
            Invalid data: please check the inputs
          </Text>
        )}

        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <PressableButton mode="flat" onPress={onCancel}>
              Cancel
            </PressableButton>
          </View>
          <View style={styles.button}>
            <PressableButton onPress={submitHandler}>
              {isEditing ? 'Update' : 'Add'}
            </PressableButton>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 32,
    marginHorizontal: 24,
  },
  title: {
    marginBottom: 12,
    ...GlobalStyles.typography.subtitle,
  },
  nextEachOther: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 8,
    marginTop: 16,
    ...GlobalStyles.typography.general,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
  },
  button: {
    marginHorizontal: 12,
    minWidth: 125,
  },
  datePicker: {
    borderRadius: 8,
    zIndex: 100,
  },
  datePickerContainer: {
    display: 'none',
    position: 'absolute',
    top: '-25%',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    justifyContent: 'center',
    minHeight: Dimensions.get('window').height,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  lastInputField: {
    marginBottom: 0,
  },
  calendarInput: {
    flex: 1,
    marginLeft: 4,
  },
  calendarTextColor: {
    color: GlobalStyles.colors.generalText,
  },
});

export default ExpenseForm;
