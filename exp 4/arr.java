public class arr {
    public static void main(String[] args) {
        int[] numbers = {12, 45, 7, 89, 23};

        System.out.println("Array elements:");
        for (int n : numbers) {
            System.out.print(n + " ");
        }

        System.out.println();

        int sum = 0;
        for (int n : numbers) {
            sum += n;
        }

        System.out.println("Sum of array elements: " + sum);
    }
}
