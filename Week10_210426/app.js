// Create AngularJS Module
var app = angular.module('studentApp', []);
// Create Controller
app.controller('StudentController', function($scope) {
    // Initialize variables
    $scope.students = [];
    $scope.newStudent = {};
    $scope.selectedStudent = {};
    var studentIdCounter = 1;
    // Function to add a new student record
    // Event: ng-submit on form
    $scope.addStudent = function() {
        // Create a new student object with a unique ID
        var student = {
            id: studentIdCounter++,
            name: $scope.newStudent.name,
            email: $scope.newStudent.email,
            phone: $scope.newStudent.phone,
            rollNo: $scope.newStudent.rollNo,
            marks: $scope.newStudent.marks
        };
        // Add the student to the students array
        $scope.students.push(student);
        // Reset the form and newStudent object
        $scope.newStudent = {};
        $scope.studentForm.$setPristine();
        $scope.studentForm.$setUntouched();
        // Show success message (optional)
        console.log('Student added successfully:', student);
    };
    // Function to delete a student record
    // Event: ng-click on delete button
    $scope.deleteStudent = function(index) {
        // Confirm deletion
        if (confirm('Are you sure you want to delete this student record?')) {
            $scope.students.splice(index, 1);
            $scope.selectedStudent = {};
            console.log('Student deleted at index:', index);
        }
    };
    // Function to select a student and display details
    // Event: ng-click on table row
    $scope.selectStudent = function(student) {
        $scope.selectedStudent = student;
        console.log('Selected student:', student);
    };
    // Function to calculate grade based on marks
    $scope.getGrade = function(marks) {
        if (marks === undefined || marks === null || marks === '') {
            return 'N/A';
        }
        marks = parseInt(marks);
        if (marks >= 90) {
            return 'A+';
        } else if (marks >= 80) {
            return 'A';
        } else if (marks >= 70) {
            return 'B+';
        } else if (marks >= 60) {
            return 'B';
        } else if (marks >= 50) {
            return 'C';
        } else if (marks >= 40) {
            return 'D';
        } else {
            return 'F';
        }
    };
    // Watch for changes in the form's validity
    $scope.$watch('studentForm.$valid', function(newVal) {
        if (newVal) {
            console.log('Form is now valid');
        }
    });
    // Optional: Add some sample data for demonstration
    $scope.addSampleData = function() {
        var sampleStudents = [
            {
                id: studentIdCounter++,
                name: 'John Doe',
                email: 'john@example.com',
                phone: '9876543210',
                rollNo: 101,
                marks: 85
            },
            {
                id: studentIdCounter++,
                name: 'Jane Smith',
                email: 'jane@example.com',
                phone: '9123456789',
                rollNo: 102,
                marks: 92
            }
        ];
        $scope.students = $scope.students.concat(sampleStudents);
        console.log('Sample data added');
    };
});
