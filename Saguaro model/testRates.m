close all;
tspan = [0:.001:1];
subplot(1,2,1)
plot(tspan,calc_r1(tspan))
xlabel('Time, Over One Year')
ylabel('Saguaro Germination Rate')
title('Seasonal Germination Rate')

subplot(1,2,2)
plot(tspan,calc_mua(tspan))
xlabel('Time, Over One Year')
ylabel('Saguaro Death Rate')
title('Seasonal Death Rate')