close all;
param_struct= ...
{'r1',4.725;%
'k1', 250;%fixed
'b',.8;%fixed
'gamma', 1/35;%fixed
'phi',.07;%
'k2',(565+1350)/2;%fixed
'muj', .042; %
'mua',1/140;%fixed
'alpha1', .000001;%fixed
'rho',(1/(80-35))*(1/100)*.8;%
'e', .113;%fixed
'omega',.35; %focus on this param down for sensitivity
'k3', 60000; %fixed
'mub',1/3;%vary
'theta_j',1/(1111*250*(1-.0027));%vary (mortality of species)/(min buffel pop)( fire frequency)
'theta_a', 0.7/(1111*250*(1-.0027));%vary
'theta_t', 0.63/(1111*250*(1-.0027));%vary
'sigma',(((1/(80-35))*(1/100)*.8 )/.07)*(565+1350)/2;
}';
params = struct(param_struct{:});

tspan = [0:.001:1];
figure()
plot(tspan,calc_r1(tspan,params), 'Linewidth',2)
xlabel('Time, Over One Year')
ylabel('Rate that Juvenile Saguaros Enter the Population')
title('Rate that Juvenile Saguaros Enter the Population')

figure()
subplot(1,2,1)
plot(tspan,calc_muj(tspan, params), 'Linewidth',2)
xlabel('Time, Over One Year')
ylabel('Saguaro Juvenile death Rate')
title('Seasonal juvenile death Rate')

subplot(1,2,2)
plot(tspan,calc_mua(tspan, params), 'Linewidth',2)
xlabel('Time, Over One Year')
ylabel('Saguaro adult Death Rate')
title('Seasonal Death Rate')