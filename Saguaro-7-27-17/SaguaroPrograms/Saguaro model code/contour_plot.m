function [] = contour_plot(Q, params,range1,range2, p1name, p2name)
[p1, p2] = meshgrid(range1, range2);
how_many = numel(p1);
for i = 1:how_many
    params1 = params;
    params1.(p1name) = p1(i);

    params1.(p2name) = p2(i);

    z(i) = Q(params1);
    
end
z = reshape(z,size(p1));

contour(p1,p2,z,40);
xlabel(p1name);
ylabel(p2name);
colorbar
end