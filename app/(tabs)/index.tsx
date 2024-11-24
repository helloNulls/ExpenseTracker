import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions,Alert } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Calendar } from 'react-native-calendars'; // Import a calendar component

const screenWidth = Dimensions.get('window').width;

const dummyData = [
  { id: '1', title: 'Category 1', percentage: 20 },
  { id: '2', title: 'Category 2', percentage: 15 },
  { id: '3', title: 'Category 3', percentage: 25 },
  { id: '4', title: 'Category 4', percentage: 10 },
  { id: '5', title: 'Category 5', percentage: 15 },
  { id: '6', title: 'Category 6', percentage: 15 },
];

const chartData = dummyData.map((item, index) => ({
  name: item.title,
  population: item.percentage,
  color: `hsl(${(index * 60) % 360}, 70%, 60%)`,
  legendFontColor: "#7F7F7F",
  legendFontSize: 12,
}));

type MarkedDate = {
  marked: boolean;
  dotColor: string;
  amount: number;
};

const markedDates: Record<string, MarkedDate> = {
  '2024-11-19': {
    marked: true,
    dotColor: 'blue',
    amount: -(Math.random() * 100).toFixed(2), // Random negative amount
  },
  '2024-11-22': {
    marked: true,
    dotColor: 'red',
    amount: +(Math.random() * 100).toFixed(2), // Random positive amount
  },
};

export default function ExpenseTrackerScreen() {
  const [activeTab, setActiveTab] = useState('reports');

  const totalCAD = Object.values(markedDates).reduce((sum, { amount }) => sum + amount, 0).toFixed(2);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.options}>
          <TouchableOpacity onPress={() => setActiveTab('reports')}>
            <Text style={[styles.optionText, activeTab === 'reports' && styles.activeText]}>
              Reports
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('monthly')}>
            <Text style={[styles.optionText, activeTab === 'monthly' && styles.activeText]}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('daily')}>
            <Text style={[styles.optionText, activeTab === 'daily' && styles.activeText]}>
              Daily
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conditional Render */}
      {activeTab === 'monthly' ? (
        <View>
          {/* Monthly Expense Section */}
          <View style={styles.expenseSection}>
            <Text style={styles.expenseText}>Monthly Expense</Text>
            <View style={styles.expenseDetails}>
              <Text style={styles.currencyText}>{`${totalCAD} CAD`}</Text>
              <Text style={styles.currencyText}>~~~ KRW</Text>
            </View>
          </View>
        <View style={styles.calendarContainer}>
          <Calendar
            style={styles.calendarStyle}
            markedDates={Object.keys(markedDates).reduce((acc: { [key: string]: any }, date) => {
              acc[date] = {
                ...markedDates[date],
                customStyles: {
                  container: { justifyContent: 'center', alignItems: 'center' },
                  text: { color: '#000' },
                },
                amount: markedDates[date].amount,
              };
              return acc;
            }, {})}
            theme={{
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              textDayFontSize: 18,
              textMonthFontSize: 20,
              textDayHeaderFontSize: 16,
              'stylesheet.calendar.main': {
                week: {
                  width:'100%',
                  marginVertical: 25, // Add more spacing between rows
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems:'stretch',
                },
              },
            }}
            dayComponent={({ date, marking }: {
              date: { day: number; month: number; year: number };
              marking?: { marked?: boolean; dotColor?: string; amount?: number };
            }) => {
              const isMarked = marking && marking.marked;
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 18, color: marking?.dotColor }}>{date.day}</Text>
                  {isMarked&& marking?.amount !== undefined && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: marking.dotColor === 'red' ? 'red' : 'blue',
                      }}
                    >
                      {marking.amount > 0 ? `+${marking.amount}` : `${marking.amount}`}
                    </Text>
                  )}
                </View>
              );
            }}
          />
        </View>
        </View>
      ) : (
        // Default Content for other tabs
        <>
          <View style={styles.chartContainer}>
            <PieChart
              data={chartData}
              width={screenWidth - 32}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              absolute
            />
          </View>

          <FlatList
            contentContainerStyle={styles.categoryList}
            data={dummyData}
            renderItem={({ item }) => (
              <View style={styles.categoryItem}>
                <Text>{item.title}: {item.percentage}%</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
    width: '100%',
    marginTop: 50,
  },
  options: {
    flexDirection: 'row',
    gap: 60,
  },
  optionText: {
    fontSize: 18,
    color: '#000', // Default color for unselected tabs
  },
  activeText: {
    color: '#66bed9', // Color for selected tab
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  calendarContainer: {
    marginTop: 20,
    paddingHorizontal: 16, // Optional padding for sides
    paddingBottom: 40,
    alignItems:'center'
  },
  calendarStyle: {
    width: '100%',
    minHeight:600
  },
  categoryList: {
    marginTop: 20,
  },
  categoryItem: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  expenseSection: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  expenseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  expenseDetails: {
    flexDirection: 'column',
    marginTop: 10,
  },
  currencyText: {
    fontSize: 16,
    color: '#555',
  },
});
