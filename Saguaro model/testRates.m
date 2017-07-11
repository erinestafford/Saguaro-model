close all;
tspan = [0:.001:1];
% figure()
% plot(tspan,calc_r1(tspan))
% xlabel('Time, Over One Year')
% ylabel('Rate that Juvenile Saguaros Enter the Population')
% title('Rate that Juvenile Saguaros Enter the Population')

subplot(1,2,1)
plot(tspan,calc_muj(tspan))
xlabel('Time, Over One Year')
ylabel('Saguaro Juvenile death Rate')
title('Seasonal juvenile death Rate')

subplot(1,2,2)
plot(tspan,calc_mua(tspan))
xlabel('Time, Over One Year')
ylabel('Saguaro adult Death Rate')
title('Seasonal Death Rate')