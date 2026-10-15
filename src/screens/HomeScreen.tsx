import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import ShopButton from "@components/ShopButton";
import Typography from "@components/ui/Typography";
import ShopInput from "@components/ui/ShopInput";
import { useCountdown } from "@hooks/useCountdown";
import { COLORS, SIZES } from "@constants/theme";
import { useTheme } from "@contexts/ThemeContext";

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const { timeLeft, isFinished } = useCountdown(60);
  const { colors, isDark, toggleTheme } = useTheme(); // Lấy bộ màu + hàm chuyển Theme

  const handleCheckout = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Thanh toán thành công!", coupon);
    }, 2000);
  }, [coupon]);

  return (
    <View style={[styles.container,{ backgroundColor: colors.background }]}>
      <Typography variant="h1" color={colors.text} style={styles.title}>
        ShopAI UI Kit
      </Typography>

      <ShopButton
        title={isDark ? "Chuyển sang Sáng" : "Chuyển sang Tối"}
        onPress={toggleTheme}
        style={{ backgroundColor: colors.primary, marginBottom: 16 }}
      />
      
      <Typography
        variant="body2"
        color={COLORS.textLight}
        style={{ textAlign: "center", marginBottom: 16 }}
      >
        {isFinished
          ? "Đã hết hạn khuyến mãi!"
          : `Flash sale kết thúc sau: ${timeLeft}s`}
      </Typography>

      <View style={styles.card}>
        <Typography variant="h2" color={COLORS.primary} style={styles.price}>
          Tổng tiền: 15.000.000đ
        </Typography>

        <ShopInput
          label="Mã giảm giá"
          placeholder="Nhập mã (VD: SHOPAI10)"
          value={coupon}
          onChangeText={setCoupon}
          autoCapitalize="characters"
        />

        <ShopButton
          title="Xác nhận thanh toán"
          onPress={handleCheckout}
          isLoading={loading}
          disabled={isFinished}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    padding: SIZES.padding,
  },
  title: { textAlign: "center", marginBottom: 12 },
  card: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: SIZES.radius,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  price: { marginBottom: 20, textAlign: "center" },
});

export default HomeScreen;