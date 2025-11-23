import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface OrderConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onDone: () => void;
  orderNumber: string;
  estimatedTime: string;
}

const OrderConfirmationModal = ({
  visible,
  onClose,
  onDone,
  orderNumber,
  estimatedTime,
}: OrderConfirmationModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 items-center justify-center px-6">
        <View className="bg-white rounded-3xl w-full max-w-md p-6">
          <View className="items-center space-y-4">
            {/* Success Icon */}
            <View className="w-16 h-16 rounded-full bg-green-100 items-center justify-center">
              <Ionicons name="checkmark-circle" size={32} color="#16a34a" />
            </View>

            {/* Title and Description */}
            <View className="items-center">
              <Text className="text-xl font-bold text-gray-900 mb-2">
                Order Confirmed!
              </Text>
              <Text className="text-gray-500 text-center">
                Your order #{orderNumber} has been placed successfully. Estimated delivery in {estimatedTime}.
              </Text>
            </View>

            {/* Buttons */}
            <View className="w-full space-y-3 pt-4">
              <TouchableOpacity className="w-full h-12 bg-orange-500 items-center justify-center rounded-xl">
                <Text className="text-base font-semibold text-white">Track Order</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={onDone}
                className="w-full h-12 bg-gray-100 items-center justify-center rounded-xl"
              >
                <Text className="text-base font-semibold text-gray-900">Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OrderConfirmationModal;