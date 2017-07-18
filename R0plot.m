v1=[0 0;0 1;1 1;1 0];
v2=[1 0;1 1;3 1;3 0];
v3=[0 1;0 3;1 3;1 1];
v4=[1 1;1 3;3 3;3 1];
f1=[1 2 3 4];
hold on;
p1=patch('Faces',f1,'Vertices',v1,'FaceColor',[51/255 1 153/255],'FaceAlpha',.7,'EdgeAlpha',.1);
p2=patch('Faces',f1,'Vertices',v2,'FaceColor',[0 128/255 1],'FaceAlpha',.7,'EdgeAlpha',.1);
p3=patch('Faces',f1,'Vertices',v3,'FaceColor',[204/255 0 102/255],'FaceAlpha',.6,'EdgeAlpha',.1);
p4=patch('Faces',f1,'Vertices',v4,'FaceColor',[76/255 0 153/255],'FaceAlpha',.6,'EdgeAlpha',.1);

text(.5,2,'E_2','FontSize',12,'FontWeight','bold');
text(2,.5,'E_3','FontSize',12,'FontWeight','bold');
text(2,2,'E_4, E_5','FontSize',12,'FontWeight','bold')
%legend('E_1','E_2','E_3','E_4,E_5')
%rectangle('Position',[0 0 1 1],'FaceColor',[51/255 1 153/255],'EdgeColor',[51/255 1 153/255);
plot(x1,y1,'--','Color','r','LineWidth',3)
x2=[0 3];
y2=[1 1];
plot(x2,y2,'--','Color','r','LineWidth',3);
xlabel('R_{d1}');
xticks([0 1 2 3]);
xticklabels({'0','1','','\infty'});
yticks([0 1 2 3]);
yticklabels({'0','1','','\infty'});
ylabel('R_{d2}');
set(gca,'FontSize',12);

% fx = 1 / 20; % 1 / period in x direction
% fy = 1 / 20; % 1 / period in y direction
% Nx = 200; % image dimension in x direction
% Ny = 200; % image dimension in y direction
% [xi, yi] = ndgrid(1 : Nx, 1 : Ny);
% mask = sin(2 * pi * (fx * xi  + fy * yi)) > 0; % for binary mask
% mask = (sin(2 * pi * (fx * xi  + fy * yi)) + 1) / 2; % for gradual [0,1] mask
% imagesc(mask) % only if you want to see it